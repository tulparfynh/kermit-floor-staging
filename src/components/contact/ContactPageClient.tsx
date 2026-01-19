
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Building, Printer, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';
import { contactFormSchema } from '@/lib/schema';
import { Separator } from '../ui/separator';

function LocationCard({ location }: { location: { title: string; details: any[] } }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-center tracking-wider">{location.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {location.details.map((item, index) => (
          item.value && <React.Fragment key={index}>
            <div className="flex items-start gap-4">
              <item.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div className="text-muted-foreground whitespace-pre-line text-sm">
                {item.href ? (
                  <a href={item.href} className="hover:text-primary transition-colors">{item.value}</a>
                ) : (
                  <span>{item.value}</span>
                )}
              </div>
            </div>
            {index < location.details.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}


function ContactForm() {
  const t = useTranslations('ContactPage.form');
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      inquiryType: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const result = await submitContactForm(values);
    if (result.success) {
      toast({
        title: t('successTitle'),
        description: t('successDescription', { name: values.name }),
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: t('errorTitle'),
        description: t('errorMessage'),
      });
    }
  }

  const inquiryTypes = [
    { value: 'sales', label: t('inquiryTypeSales') },
    { value: 'support', label: t('inquiryTypeSupport') },
    { value: 'partnership', label: t('inquiryTypePartnership') },
    { value: 'general', label: t('inquiryTypeGeneral') },
  ];

  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">{t('title')}</CardTitle>
            <p className="text-muted-foreground pt-1">{t('description')}</p>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('nameLabel')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('namePlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('emailLabel')}</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder={t('emailPlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('phoneLabel')}</FormLabel>
                        <FormControl>
                            <Input placeholder={t('phonePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="inquiryType" render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('inquiryTypeLabel')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('inquiryTypePlaceholder')} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {inquiryTypes.map(type => (
                                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('messageLabel')}</FormLabel>
                        <FormControl>
                            <Textarea placeholder={t('messagePlaceholder')} className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? t('submittingButton') : t('submitButton')}
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}

export default function ContactPageClient() {
  const t = useTranslations('ContactPage');
  const tLoc = useTranslations('ContactPage.locations');
  
  const locations = [
    {
      title: tLoc('turkeyTitle'),
      details: [
        { icon: MapPin, value: tLoc('turkeyAddress') },
        { icon: Phone, value: tLoc('turkeyPhone'), href: `tel:${tLoc('turkeyPhone').replace(/ /g,'')}` },
        { icon: Printer, value: tLoc('turkeyFax'), href: `tel:${tLoc('turkeyFax').replace(/ /g,'')}` },
        { icon: Mail, value: tLoc('turkeyEmail'), href: `mailto:${tLoc('turkeyEmail')}` },
      ]
    },
    {
      title: tLoc('moldovaTitle'),
      details: [
        { icon: MapPin, value: tLoc('moldovaAddress') },
        { icon: Phone, value: tLoc('moldovaPhone') },
        { icon: Smartphone, value: tLoc('moldovaGsm'), href: `tel:${tLoc('moldovaGsm').replace('GSM:', '').replace(/ /g,'')}` },
        { icon: Printer, value: tLoc('moldovaFax') },
        { icon: Mail, value: tLoc('moldovaEmail'), href: `mailto:info@serkanplast.com` },
      ]
    },
    {
      title: tLoc('romaniaTitle'),
      details: [
        { icon: Building, value: tLoc('romaniaCompany') },
        { icon: MapPin, value: tLoc('romaniaAddress') },
        { icon: Phone, value: tLoc('romaniaPhone') },
        { icon: Mail, value: tLoc('romaniaEmail'), href: `mailto:${tLoc('romaniaEmail')}` },
      ]
    }
  ];

  return (
    <>
      <section className="relative h-64 w-full">
        <Image
          src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop"
          alt="Business team in a modern office"
          fill
          className="object-cover"
          data-ai-hint="business office contact"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {t('hero.title')}
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-12">
        <section>
          <h2 className="text-3xl font-bold font-headline text-center mb-8">{tLoc('title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((loc, index) => (
              <LocationCard key={index} location={loc} />
            ))}
          </div>
        </section>

        <Separator />
        
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="lg:col-span-2">
            <div className="aspect-video w-full rounded-lg overflow-hidden border">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.825595281358!2d28.97585097669695!3d41.00693997135063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9967201c1e7%3A0x44207f2a1a01c34a!2sKermit%20the%20Frog!5e0!3m2!1sen!2str!4v1721908479705!5m2!1sen!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Company Location"
                ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
