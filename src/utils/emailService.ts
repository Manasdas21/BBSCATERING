
/**
 * Email service utility for sending notification emails
 */
import { BookingFormData, ContactFormData } from "@/types/forms";

const EMAIL_SERVICE_URL = "https://api.emailjs.com/api/v1.0/email/send";

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: "service_s8x9df9",
  templateId: "template_smvlg5q", 
  userId: "Zy4XPV1IXfiN-KzcB"
};

/**
 * Sends a notification email to admin when a customer submits a booking inquiry
 */
export const sendAdminNotification = async (formData: ContactFormData): Promise<boolean> => {
  try {
    console.log('Sending admin notification with form data:', formData);
    
    const templateParams = {
      to_email: "alekh0253@gmail.com",
      from_name: formData.name,
      customer_phone: formData.phone,
      event_date: formData.date,
      message: `
        New Booking Inquiry:
        
        Name: ${formData.name}
        Phone: ${formData.phone}
        Event Date: ${formData.date}
        Special Requests: ${formData.message}
      `,
      reply_to: "noreply@bbscatering.com"
    };

    const response = await fetch(EMAIL_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.serviceId,
        template_id: EMAILJS_CONFIG.templateId,
        user_id: EMAILJS_CONFIG.userId,
        template_params: templateParams,
      }),
    });

    const result = await response.text();
    console.log('Admin notification response:', response.status, result);

    if (response.ok) {
      return true;
    }
    console.error("Failed to send admin notification:", result);
    return false;
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return false;
  }
};

/**
 * Sends a booking request email to admin with detailed event information
 */
export const sendBookingEmail = async (formData: BookingFormData): Promise<boolean> => {
  try {
    console.log('Sending booking email with form data:', formData);
    
    const templateParams = {
      to_email: "alekh0253@gmail.com",
      from_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      event_date: formData.eventDate,
      event_time: formData.eventTime,
      event_location: formData.location,
      event_type: formData.eventType,
      guest_count: formData.guestCount,
      message: formData.message,
      reply_to: formData.email,
      subject: `New Booking Request: ${formData.eventType}`,
      // Additional fields for better email formatting
      customer_name: formData.name,
      phone: formData.phone
    };

    console.log('Template params:', templateParams);

    const response = await fetch(EMAIL_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.serviceId,
        template_id: EMAILJS_CONFIG.templateId,
        user_id: EMAILJS_CONFIG.userId,
        template_params: templateParams,
      }),
    });

    const result = await response.text();
    console.log('Booking email response:', response.status, result);

    if (response.ok) {
      console.log('Booking email sent successfully');
      return true;
    }
    console.error("Failed to send booking email:", result);
    return false;
  } catch (error) {
    console.error("Error sending booking email:", error);
    return false;
  }
};

/**
 * Sends a confirmation email to the customer after submitting a booking request
 */
export const sendCustomerConfirmation = async (formData: BookingFormData): Promise<boolean> => {
  try {
    console.log('Sending customer confirmation with form data:', formData);
    
    const templateParams = {
      to_email: formData.email,
      from_name: "BBS Catering",
      customer_name: formData.name,
      event_date: formData.eventDate,
      event_time: formData.eventTime,
      event_location: formData.location,
      event_type: formData.eventType,
      guest_count: formData.guestCount,
      reply_to: "alekh0253@gmail.com",
      subject: `Booking Confirmation: ${formData.eventType}`
    };

    const response = await fetch(EMAIL_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.serviceId,
        template_id: EMAILJS_CONFIG.templateId,
        user_id: EMAILJS_CONFIG.userId,
        template_params: templateParams,
      }),
    });

    const result = await response.text();
    console.log('Customer confirmation response:', response.status, result);

    if (response.ok) {
      return true;
    }
    console.error("Failed to send customer confirmation email:", result);
    return false;
  } catch (error) {
    console.error("Error sending customer confirmation email:", error);
    return false;
  }
};
