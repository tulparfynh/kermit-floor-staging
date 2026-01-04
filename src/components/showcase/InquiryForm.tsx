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

type InquiryFormProps = {
  panel: Panel;
};

export function InquiryForm({ panel }: InquiryFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      panelName: panel.name,
    },
  });

  React.useEffect(() => {
    form.setValue('panelName', panel.name);
  }, [panel, form]);

  async function onSubmit(values: z.infer<typeof inquirySchema>) {
    const result = await submitInquiry(values);
    if (result.success) {
      toast({
        title: 'Inquiry Sent!',
        description: result.message,
      });
      form.reset({
        name: '',
        email: '',
        message: '',
        panelName: panel.name,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: result.message,
      });
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-none">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Mail className="h-7 w-7 text-primary"/>
          <CardTitle className="font-headline text-3xl">Send an Inquiry</CardTitle>
        </div>
        <CardDescription className="text-lg">
          Interested in the <span className="font-semibold text-primary">{panel.name}</span> panel? Fill out the form and we'll get back to you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <input type="hidden" {...form.register('panelName')} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="bg-card text-base" />
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} className="bg-card text-base" />
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
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I'd like to know more about pricing and availability..."
                      className="min-h-[120px] bg-card text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
                <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="w-full md:w-auto">
                {form.formState.isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
