'use server';

import { z } from 'zod';
import { inquirySchema } from '@/lib/schema';

export async function submitInquiry(data: z.infer<typeof inquirySchema>) {
  try {
    // In a real application, you would send an email here.
    // For this showcase, we'll just log the data to the console.
    console.log('New Inquiry Received:');
    console.log(data);
    
    return {
      success: true,
      message: `Thank you, ${data.name}! Your inquiry about ${data.panelName} has been received.`,
    };
  } catch (e) {
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
