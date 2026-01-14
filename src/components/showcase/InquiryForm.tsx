
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitInquiry } from '@/app/actions';
import { inquirySchema } from '@/lib/schema';
import type { Panel } from '@/lib/panel-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

type InquiryFormProps = {
  panel: Panel;
  collectionType: 'spc-wall-panels' | 'spc-3d-wall-panels-model-a';
};

export function InquiryForm({ panel, collectionType }: InquiryFormProps) {
  const t = useTranslations('InquiryForm');
  const tSpcPanelNames = useTranslations('PanelNames');
  const t3dPanelNames = useTranslations('3DModelAPanelNames');
  const tPanelNames = (key: string) => collectionType === 'spc-3d-wall-panels-model-a' ? t3dPanelNames(key) : tSpcPanelNames(key);
  const panelName = tPanelNames(panel.nameKey);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      panelName: panelName,
    },
  });

  React.useEffect(() => {
    const newPanelName = tPanelNames(panel.nameKey);
    form.setValue('panelName', newPanelName);
  }, [panel, form, tPanelNames]);

  async function onSubmit(values: z.infer<typeof inquirySchema>) {
    const result = await submitInquiry(values);
    if (result.success) {
      toast({
        title: t('successTitle'),
        description: t('successDescription', { name: values.name, panelName: values.panelName }),
      });
      form.reset({
        name: '',
        email: '',
        message: '',
        panelName: tPanelNames(panel.nameKey),
      });
    } else {
      toast({
        variant: 'destructive',
        title: t('errorTitle'),
        description: result.message === 'An unexpected error occurred. Please try again.' ? t('errorMessage') : result.message,
      });
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-none">
      <CardHeader className="text-center p-4">
        <div className="flex items-center justify-center gap-3 mb-1">
          <Mail className="h-6 w-6 text-primary"/>
          <CardTitle className="font-headline text-2xl">{t('title')}</CardTitle>
        </div>
        <CardDescription className="text-base">
          {t.rich('description', {
            panelName: panelName,
            span: (chunks) => <span className="font-semibold text-primary">{chunks}</span>
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...form.register('panelName')} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('nameLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('namePlaceholder')} {...field} className="bg-card text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('emailLabel')}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t('emailPlaceholder')} {...field} className="bg-card text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('messageLabel')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('messagePlaceholder')}
                      className="min-h-[100px] bg-card text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center pt-2">
                <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="w-full md:w-auto">
                {form.formState.isSubmitting ? t('submittingButton') : t('submitButton')}
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
