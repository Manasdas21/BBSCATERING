
/**
 * Type definitions for form data
 */

export interface ContactFormData {
  name: string;
  phone: string;
  date: string;
  message: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  location: string;
  eventType: string;
  guestCount: string;
  message: string;
}
