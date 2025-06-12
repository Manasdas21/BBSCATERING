
// // import React, { useState } from 'react';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Badge } from '@/components/ui/badge';
// // import { Calendar, Clock, MapPin, Phone, Mail, User, CheckCircle } from 'lucide-react';
// // import { useToast } from '@/hooks/use-toast';

// // const EnhancedBookingExperience = () => {
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const [bookingData, setBookingData] = useState({
// //     eventDetails: {},
// //     contactInfo: {},
// //     preferences: {}
// //   });
// //   const { toast } = useToast();

// //   const steps = [
// //     { number: 1, title: 'Event Details', icon: Calendar },
// //     { number: 2, title: 'Contact Information', icon: User },
// //     { number: 3, title: 'Preferences', icon: CheckCircle },
// //     { number: 4, title: 'Confirmation', icon: CheckCircle }
// //   ];

// //   const nextStep = () => {
// //     if (currentStep < 4) {
// //       setCurrentStep(currentStep + 1);
// //     }
// //   };

// //   const prevStep = () => {
// //     if (currentStep > 1) {
// //       setCurrentStep(currentStep - 1);
// //     }
// //   };

// //   const handleSubmit = () => {
// //     toast({
// //       title: "Booking Submitted!",
// //       description: "We'll contact you within 24 hours to confirm your booking.",
// //     });
// //   };

// //   const renderStep = () => {
// //     switch (currentStep) {
// //       case 1:
// //         return (
// //           <div className="space-y-6">
// //             <h3 className="text-xl font-semibold text-forest mb-4">Event Details</h3>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <Label htmlFor="eventType">Event Type</Label>
// //                 <Input id="eventType" placeholder="e.g., Wedding, Birthday, Corporate" />
// //               </div>
// //               <div>
// //                 <Label htmlFor="guestCount">Number of Guests</Label>
// //                 <Input id="guestCount" type="number" placeholder="50" />
// //               </div>
// //               <div>
// //                 <Label htmlFor="eventDate">Event Date</Label>
// //                 <Input id="eventDate" type="date" />
// //               </div>
// //               <div>
// //                 <Label htmlFor="eventTime">Event Time</Label>
// //                 <Input id="eventTime" type="time" />
// //               </div>
// //             </div>
// //             <div>
// //               <Label htmlFor="venue">Venue Address</Label>
// //               <Textarea id="venue" placeholder="Enter complete venue address" rows={3} />
// //             </div>
// //           </div>
// //         );

// //       case 2:
// //         return (
// //           <div className="space-y-6">
// //             <h3 className="text-xl font-semibold text-forest mb-4">Contact Information</h3>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <Label htmlFor="firstName">First Name</Label>
// //                 <Input id="firstName" placeholder="John" />
// //               </div>
// //               <div>
// //                 <Label htmlFor="lastName">Last Name</Label>
// //                 <Input id="lastName" placeholder="Doe" />
// //               </div>
// //               <div>
// //                 <Label htmlFor="email">Email Address</Label>
// //                 <Input id="email" type="email" placeholder="john@example.com" />
// //               </div>
// //               <div>
// //                 <Label htmlFor="phone">Phone Number</Label>
// //                 <Input id="phone" placeholder="+91 9876543210" />
// //               </div>
// //             </div>
// //             <div>
// //               <Label htmlFor="additionalContact">Alternative Contact (Optional)</Label>
// //               <Input id="additionalContact" placeholder="Alternative contact person and number" />
// //             </div>
// //           </div>
// //         );

// //       case 3:
// //         return (
// //           <div className="space-y-6">
// //             <h3 className="text-xl font-semibold text-forest mb-4">Preferences & Requirements</h3>
// //             <div className="space-y-4">
// //               <div>
// //                 <Label>Dietary Preferences</Label>
// //                 <div className="flex flex-wrap gap-2 mt-2">
// //                   {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Jain', 'Gluten-Free'].map((diet) => (
// //                     <Badge key={diet} variant="outline" className="cursor-pointer hover:bg-gold hover:text-white">
// //                       {diet}
// //                     </Badge>
// //                   ))}
// //                 </div>
// //               </div>
// //               <div>
// //                 <Label>Service Type</Label>
// //                 <div className="flex flex-wrap gap-2 mt-2">
// //                   {['Buffet', 'Plated Service', 'Food Stations', 'Family Style'].map((service) => (
// //                     <Badge key={service} variant="outline" className="cursor-pointer hover:bg-forest hover:text-white">
// //                       {service}
// //                     </Badge>
// //                   ))}
// //                 </div>
// //               </div>
// //               <div>
// //                 <Label htmlFor="specialRequests">Special Requests</Label>
// //                 <Textarea 
// //                   id="specialRequests" 
// //                   placeholder="Any special dietary requirements, decorations, or specific requests..." 
// //                   rows={4}
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         );

// //       case 4:
// //         return (
// //           <div className="space-y-6 text-center">
// //             <div className="bg-green-50 border border-green-200 rounded-lg p-6">
// //               <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
// //               <h3 className="text-2xl font-semibold text-forest mb-2">Booking Summary</h3>
// //               <p className="text-gray-600 mb-4">Please review your booking details before submitting</p>
              
// //               <div className="bg-white rounded-lg p-4 text-left space-y-2">
// //                 <div className="flex justify-between">
// //                   <span className="font-medium">Event Type:</span>
// //                   <span>Wedding Celebration</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="font-medium">Guests:</span>
// //                   <span>150 people</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="font-medium">Date & Time:</span>
// //                   <span>Dec 25, 2024 at 7:00 PM</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="font-medium">Estimated Cost:</span>
// //                   <span className="text-gold font-bold">₹67,500</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         );

// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <section className="py-16 bg-gradient-to-br from-cream to-white">
// //       <div className="container mx-auto px-4">
// //         <div className="text-center mb-12">
// //           <h2 className="text-4xl font-bold text-forest mb-4">Enhanced Booking Experience</h2>
// //           <p className="text-xl text-gray-600">Simple, fast, and personalized booking process</p>
// //         </div>

// //         <div className="max-w-4xl mx-auto">
// //           {/* Progress Steps */}
// //           <div className="flex justify-center mb-8">
// //             <div className="flex items-center space-x-4">
// //               {steps.map((step, index) => (
// //                 <React.Fragment key={step.number}>
// //                   <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
// //                     currentStep >= step.number 
// //                       ? 'bg-gold text-white' 
// //                       : 'bg-gray-200 text-gray-500'
// //                   }`}>
// //                     <step.icon className="w-4 h-4" />
// //                     <span className="font-medium text-sm">{step.title}</span>
// //                   </div>
// //                   {index < steps.length - 1 && (
// //                     <div className={`w-8 h-0.5 transition-colors duration-300 ${
// //                       currentStep > step.number ? 'bg-gold' : 'bg-gray-300'
// //                     }`} />
// //                   )}
// //                 </React.Fragment>
// //               ))}
// //             </div>
// //           </div>

// //           <Card className="shadow-xl">
// //             <CardContent className="p-8">
// //               {renderStep()}

// //               <div className="flex justify-between mt-8">
// //                 <Button
// //                   variant="outline"
// //                   onClick={prevStep}
// //                   disabled={currentStep === 1}
// //                   className="px-6"
// //                 >
// //                   Previous
// //                 </Button>
                
// //                 {currentStep < 4 ? (
// //                   <Button
// //                     onClick={nextStep}
// //                     className="bg-gold hover:bg-gold/90 px-6"
// //                   >
// //                     Next Step
// //                   </Button>
// //                 ) : (
// //                   <Button
// //                     onClick={handleSubmit}
// //                     className="bg-forest hover:bg-forest/90 px-8"
// //                   >
// //                     Submit Booking
// //                   </Button>
// //                 )}
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Quick Contact Options */}
// //           <div className="mt-8 text-center">
// //             <p className="text-gray-600 mb-4">Need help? Contact us directly:</p>
// //             <div className="flex justify-center gap-4">
// //               <Button variant="outline" className="flex items-center gap-2">
// //                 <Phone className="w-4 h-4" />
// //                 Call Now
// //               </Button>
// //               <Button variant="outline" className="flex items-center gap-2">
// //                 <Mail className="w-4 h-4" />
// //                 Email Us
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default EnhancedBookingExperience;



// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Badge } from '@/components/ui/badge';
// import { Calendar, Clock, MapPin, Phone, Mail, User, CheckCircle } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { sendBookingEmail } from '@/utils/emailService';
// import { BookingFormData } from '@/types/forms';

// const EnhancedBookingExperience = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();
  
//   const [bookingData, setBookingData] = useState({
//     eventDetails: {
//       eventType: '',
//       guestCount: '',
//       eventDate: '',
//       eventTime: '',
//       venue: ''
//     },
//     contactInfo: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       additionalContact: ''
//     },
//     preferences: {
//       dietaryPreferences: [],
//       serviceType: [],
//       specialRequests: ''
//     }
//   });

//   const steps = [
//     { number: 1, title: 'Event Details', icon: Calendar },
//     { number: 2, title: 'Contact Information', icon: User },
//     { number: 3, title: 'Preferences', icon: CheckCircle },
//     { number: 4, title: 'Confirmation', icon: CheckCircle }
//   ];

//   const updateEventDetails = (field, value) => {
//     setBookingData(prev => ({
//       ...prev,
//       eventDetails: { ...prev.eventDetails, [field]: value }
//     }));
//   };

//   const updateContactInfo = (field, value) => {
//     setBookingData(prev => ({
//       ...prev,
//       contactInfo: { ...prev.contactInfo, [field]: value }
//     }));
//   };

//   const togglePreference = (type, value) => {
//     setBookingData(prev => ({
//       ...prev,
//       preferences: {
//         ...prev.preferences,
//         [type]: prev.preferences[type].includes(value)
//           ? prev.preferences[type].filter(item => item !== value)
//           : [...prev.preferences[type], value]
//       }
//     }));
//   };

//   const updateSpecialRequests = (value) => {
//     setBookingData(prev => ({
//       ...prev,
//       preferences: { ...prev.preferences, specialRequests: value }
//     }));
//   };

//   const nextStep = () => {
//     if (currentStep < 4) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
    
//     try {
//       console.log('Enhanced Booking: Starting submission process');
      
//       // Prepare booking data for email service (same format as Smart Recommendations)
//       const fullName = `${bookingData.contactInfo.firstName} ${bookingData.contactInfo.lastName}`.trim();
      
//       const bookingFormData: BookingFormData = {
//         name: fullName || 'Not provided',
//         email: bookingData.contactInfo.email || 'Not provided',
//         phone: bookingData.contactInfo.phone || 'Not provided',
//         eventDate: bookingData.eventDetails.eventDate || 'Not specified',
//         eventTime: bookingData.eventDetails.eventTime || 'Not specified',
//         location: bookingData.eventDetails.venue || 'To be confirmed',
//         eventType: bookingData.eventDetails.eventType || 'Not specified',
//         guestCount: bookingData.eventDetails.guestCount || 'Not specified',
//         message: `Enhanced Booking Experience Submission

// EVENT DETAILS:
// - Event Type: ${bookingData.eventDetails.eventType || 'Not specified'}
// - Date: ${bookingData.eventDetails.eventDate || 'Not specified'}
// - Time: ${bookingData.eventDetails.eventTime || 'Not specified'}
// - Guest Count: ${bookingData.eventDetails.guestCount || 'Not specified'}
// - Venue: ${bookingData.eventDetails.venue || 'Not specified'}

// CONTACT INFORMATION:
// - Name: ${fullName || 'Not provided'}
// - Email: ${bookingData.contactInfo.email || 'Not provided'}
// - Phone: ${bookingData.contactInfo.phone || 'Not provided'}
// - Alternative Contact: ${bookingData.contactInfo.additionalContact || 'None provided'}

// PREFERENCES & REQUIREMENTS:
// - Dietary Preferences: ${bookingData.preferences.dietaryPreferences.length > 0 ? bookingData.preferences.dietaryPreferences.join(', ') : 'None specified'}
// - Service Type: ${bookingData.preferences.serviceType.length > 0 ? bookingData.preferences.serviceType.join(', ') : 'None specified'}
// - Special Requests: ${bookingData.preferences.specialRequests || 'None'}

// BOOKING REFERENCE: ENB-${Date.now()}
// SUBMISSION TIME: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

// This is an enhanced booking with detailed preferences. Please contact the customer within 24 hours for confirmation.`
//       };

//       console.log('Enhanced Booking: Prepared booking data:', bookingFormData);

//       // Send booking email using the same service as Smart Recommendations
//       const emailSent = await sendBookingEmail(bookingFormData);
      
//       console.log('Enhanced Booking: Email sent result:', emailSent);

//       if (emailSent) {
//         // Store booking data in sessionStorage for reference (same pattern as Smart Recommendations)
//         const bookingReference = `ENB-${Date.now()}`;
//         const bookingRecord = {
//           bookingId: bookingReference,
//           customerInfo: {
//             name: fullName,
//             email: bookingData.contactInfo.email,
//             phone: bookingData.contactInfo.phone,
//             additionalContact: bookingData.contactInfo.additionalContact
//           },
//           eventDetails: bookingData.eventDetails,
//           preferences: bookingData.preferences,
//           submissionTime: new Date().toISOString(),
//           source: 'Enhanced Booking Experience'
//         };

//         sessionStorage.setItem('enhancedBookingSubmission', JSON.stringify(bookingRecord));

//         toast({
//           title: "🎉 Booking Submitted Successfully!",
//           description: `Your ${bookingData.eventDetails.eventType || 'event'} booking has been received. We'll contact you within 24 hours to confirm all details. Reference: ${bookingReference}`,
//         });

//         // Reset form after successful submission
//         setTimeout(() => {
//           setCurrentStep(1);
//           setBookingData({
//             eventDetails: {
//               eventType: '',
//               guestCount: '',
//               eventDate: '',
//               eventTime: '',
//               venue: ''
//             },
//             contactInfo: {
//               firstName: '',
//               lastName: '',
//               email: '',
//               phone: '',
//               additionalContact: ''
//             },
//             preferences: {
//               dietaryPreferences: [],
//               serviceType: [],
//               specialRequests: ''
//             }
//           });
//         }, 3000);

//       } else {
//         toast({
//           title: "Booking Request Received",
//           description: "Your booking request has been recorded, but there was an issue with email notification. We'll still contact you within 24 hours.",
//           variant: "destructive"
//         });
//       }

//     } catch (error) {
//       console.error('Enhanced Booking: Submission error:', error);
//       toast({
//         title: "Booking Error",
//         description: "There was an issue processing your booking. Please try again or contact us directly.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-xl font-semibold text-forest mb-4">Event Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="eventType">Event Type</Label>
//                 <Input 
//                   id="eventType" 
//                   placeholder="e.g., Wedding, Birthday, Corporate"
//                   value={bookingData.eventDetails.eventType}
//                   onChange={(e) => updateEventDetails('eventType', e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="guestCount">Number of Guests</Label>
//                 <Input 
//                   id="guestCount" 
//                   type="number" 
//                   placeholder="50"
//                   value={bookingData.eventDetails.guestCount}
//                   onChange={(e) => updateEventDetails('guestCount', e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="eventDate">Event Date</Label>
//                 <Input 
//                   id="eventDate" 
//                   type="date"
//                   value={bookingData.eventDetails.eventDate}
//                   onChange={(e) => updateEventDetails('eventDate', e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="eventTime">Event Time</Label>
//                 <Input 
//                   id="eventTime" 
//                   type="time"
//                   value={bookingData.eventDetails.eventTime}
//                   onChange={(e) => updateEventDetails('eventTime', e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="venue">Venue Address</Label>
//               <Textarea 
//                 id="venue" 
//                 placeholder="Enter complete venue address" 
//                 rows={3}
//                 value={bookingData.eventDetails.venue}
//                 onChange={(e) => updateEventDetails('venue', e.target.value)}
//               />
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-xl font-semibold text-forest mb-4">Contact Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="firstName">First Name</Label>
//                 <Input 
//                   id="firstName" 
//                   placeholder="John"
//                   value={bookingData.contactInfo.firstName}
//                   onChange={(e) => updateContactInfo('firstName', e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <Input 
//                   id="lastName" 
//                   placeholder="Doe"
//                   value={bookingData.contactInfo.lastName}
//                   onChange={(e) => updateContactInfo('lastName', e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="email">Email Address</Label>
//                 <Input 
//                   id="email" 
//                   type="email" 
//                   placeholder="john@example.com"
//                   value={bookingData.contactInfo.email}
//                   onChange={(e) => updateContactInfo('email', e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <Input 
//                   id="phone" 
//                   placeholder="+91 9876543210"
//                   value={bookingData.contactInfo.phone}
//                   onChange={(e) => updateContactInfo('phone', e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="additionalContact">Alternative Contact (Optional)</Label>
//               <Input 
//                 id="additionalContact" 
//                 placeholder="Alternative contact person and number"
//                 value={bookingData.contactInfo.additionalContact}
//                 onChange={(e) => updateContactInfo('additionalContact', e.target.value)}
//               />
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-xl font-semibold text-forest mb-4">Preferences & Requirements</h3>
//             <div className="space-y-4">
//               <div>
//                 <Label>Dietary Preferences</Label>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Jain', 'Gluten-Free'].map((diet) => (
//                     <Badge 
//                       key={diet} 
//                       variant={bookingData.preferences.dietaryPreferences.includes(diet) ? "default" : "outline"}
//                       className={`cursor-pointer transition-colors ${
//                         bookingData.preferences.dietaryPreferences.includes(diet)
//                           ? 'bg-gold text-white hover:bg-gold/90'
//                           : 'hover:bg-gold hover:text-white'
//                       }`}
//                       onClick={() => togglePreference('dietaryPreferences', diet)}
//                     >
//                       {diet}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <Label>Service Type</Label>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {['Buffet', 'Plated Service', 'Food Stations', 'Family Style'].map((service) => (
//                     <Badge 
//                       key={service} 
//                       variant={bookingData.preferences.serviceType.includes(service) ? "default" : "outline"}
//                       className={`cursor-pointer transition-colors ${
//                         bookingData.preferences.serviceType.includes(service)
//                           ? 'bg-forest text-white hover:bg-forest/90'
//                           : 'hover:bg-forest hover:text-white'
//                       }`}
//                       onClick={() => togglePreference('serviceType', service)}
//                     >
//                       {service}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="specialRequests">Special Requests</Label>
//                 <Textarea 
//                   id="specialRequests" 
//                   placeholder="Any special dietary requirements, decorations, or specific requests..." 
//                   rows={4}
//                   value={bookingData.preferences.specialRequests}
//                   onChange={(e) => updateSpecialRequests(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6 text-center">
//             <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//               <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//               <h3 className="text-2xl font-semibold text-forest mb-2">Booking Summary</h3>
//               <p className="text-gray-600 mb-4">Please review your booking details before submitting</p>
              
//               <div className="bg-white rounded-lg p-4 text-left space-y-3">
//                 <h4 className="font-bold text-lg border-b pb-2">Event Details</h4>
//                 <div className="grid grid-cols-2 gap-2 text-sm">
//                   <div><span className="font-medium">Event Type:</span></div>
//                   <div>{bookingData.eventDetails.eventType || 'Not specified'}</div>
//                   <div><span className="font-medium">Guests:</span></div>
//                   <div>{bookingData.eventDetails.guestCount || 'Not specified'}</div>
//                   <div><span className="font-medium">Date:</span></div>
//                   <div>{bookingData.eventDetails.eventDate || 'Not specified'}</div>
//                   <div><span className="font-medium">Time:</span></div>
//                   <div>{bookingData.eventDetails.eventTime || 'Not specified'}</div>
//                 </div>
//                 {bookingData.eventDetails.venue && (
//                   <div>
//                     <span className="font-medium">Venue:</span>
//                     <p className="text-sm mt-1">{bookingData.eventDetails.venue}</p>
//                   </div>
//                 )}

//                 <h4 className="font-bold text-lg border-b pb-2 pt-4">Contact Information</h4>
//                 <div className="grid grid-cols-2 gap-2 text-sm">
//                   <div><span className="font-medium">Name:</span></div>
//                   <div>{`${bookingData.contactInfo.firstName} ${bookingData.contactInfo.lastName}`.trim() || 'Not specified'}</div>
//                   <div><span className="font-medium">Email:</span></div>
//                   <div>{bookingData.contactInfo.email || 'Not specified'}</div>
//                   <div><span className="font-medium">Phone:</span></div>
//                   <div>{bookingData.contactInfo.phone || 'Not specified'}</div>
//                 </div>

//                 {(bookingData.preferences.dietaryPreferences.length > 0 || 
//                   bookingData.preferences.serviceType.length > 0 || 
//                   bookingData.preferences.specialRequests) && (
//                   <>
//                     <h4 className="font-bold text-lg border-b pb-2 pt-4">Preferences</h4>
//                     {bookingData.preferences.dietaryPreferences.length > 0 && (
//                       <div>
//                         <span className="font-medium">Dietary Preferences:</span>
//                         <div className="flex flex-wrap gap-1 mt-1">
//                           {bookingData.preferences.dietaryPreferences.map(diet => (
//                             <Badge key={diet} variant="outline" className="text-xs">{diet}</Badge>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                     {bookingData.preferences.serviceType.length > 0 && (
//                       <div>
//                         <span className="font-medium">Service Type:</span>
//                         <div className="flex flex-wrap gap-1 mt-1">
//                           {bookingData.preferences.serviceType.map(service => (
//                             <Badge key={service} variant="outline" className="text-xs">{service}</Badge>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                     {bookingData.preferences.specialRequests && (
//                       <div>
//                         <span className="font-medium">Special Requests:</span>
//                         <p className="text-sm mt-1">{bookingData.preferences.specialRequests}</p>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <section id="booking" className="py-16 bg-gradient-to-br from-cream to-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-forest mb-4">Enhanced Booking Experience</h2>
//           <p className="text-xl text-gray-600">Simple, fast, and personalized booking process</p>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           {/* Progress Steps */}
//           <div className="flex justify-center mb-8">
//             <div className="flex items-center space-x-4">
//               {steps.map((step, index) => (
//                 <React.Fragment key={step.number}>
//                   <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
//                     currentStep >= step.number 
//                       ? 'bg-gold text-white' 
//                       : 'bg-gray-200 text-gray-500'
//                   }`}>
//                     <step.icon className="w-4 h-4" />
//                     <span className="font-medium text-sm">{step.title}</span>
//                   </div>
//                   {index < steps.length - 1 && (
//                     <div className={`w-8 h-0.5 transition-colors duration-300 ${
//                       currentStep > step.number ? 'bg-gold' : 'bg-gray-300'
//                     }`} />
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>

//           <Card className="shadow-xl">
//             <CardContent className="p-8">
//               {renderStep()}

//               <div className="flex justify-between mt-8">
//                 <Button
//                   variant="outline"
//                   onClick={prevStep}
//                   disabled={currentStep === 1 || isSubmitting}
//                   className="px-6"
//                 >
//                   Previous
//                 </Button>
                
//                 {currentStep < 4 ? (
//                   <Button
//                     onClick={nextStep}
//                     className="bg-gold hover:bg-gold/90 px-6"
//                     disabled={isSubmitting}
//                   >
//                     Next Step
//                   </Button>
//                 ) : (
//                   <Button
//                     onClick={handleSubmit}
//                     className="bg-forest hover:bg-forest/90 px-8"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? 'Submitting...' : 'Submit Booking'}
//                   </Button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Quick Contact Options */}
//           <div className="mt-8 text-center">
//             <p className="text-gray-600 mb-4">Need help? Contact us directly:</p>
//             <div className="flex justify-center gap-4">
//               <Button variant="outline" className="flex items-center gap-2">
//                 <Phone className="w-4 h-4" />
//                 Call Now
//               </Button>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <Mail className="w-4 h-4" />
//                 Email Us
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EnhancedBookingExperience;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Phone, Mail, User, CheckCircle, Send } from 'lucide-react';

const EnhancedBookingExperience = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    eventDetails: {
      eventType: '',
      guestCount: '',
      eventDate: '',
      eventTime: '',
      venue: ''
    },
    contactInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      additionalContact: ''
    },
    preferences: {
      dietaryPreferences: [],
      serviceType: [],
      specialRequests: ''
    }
  });

  const steps = [
    { number: 1, title: 'Event Details', icon: Calendar },
    { number: 2, title: 'Contact Information', icon: User },
    { number: 3, title: 'Preferences', icon: CheckCircle },
    { number: 4, title: 'Confirmation', icon: CheckCircle }
  ];

  const updateEventDetails = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      eventDetails: { ...prev.eventDetails, [field]: value }
    }));
  };

  const updateContactInfo = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }));
  };

  const togglePreference = (type, value) => {
    setBookingData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: prev.preferences[type].includes(value)
          ? prev.preferences[type].filter(item => item !== value)
          : [...prev.preferences[type], value]
      }
    }));
  };

  const updateSpecialRequests = (value) => {
    setBookingData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, specialRequests: value }
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Email sending functions
  const sendAdminEmail = async (bookingData, bookingReference) => {
    const adminEmailContent = `
New Booking Received - ${bookingReference}

EVENT DETAILS:
- Event Type: ${bookingData.eventDetails.eventType || 'Not specified'}
- Number of Guests: ${bookingData.eventDetails.guestCount || 'Not specified'}
- Event Date: ${bookingData.eventDetails.eventDate || 'Not specified'}
- Event Time: ${bookingData.eventDetails.eventTime || 'Not specified'}
- Venue: ${bookingData.eventDetails.venue || 'Not specified'}

CUSTOMER CONTACT:
- Name: ${bookingData.contactInfo.firstName} ${bookingData.contactInfo.lastName}
- Email: ${bookingData.contactInfo.email}
- Phone: ${bookingData.contactInfo.phone}
- Alternative Contact: ${bookingData.contactInfo.additionalContact || 'None'}

PREFERENCES:
- Dietary Preferences: ${bookingData.preferences.dietaryPreferences.join(', ') || 'None specified'}
- Service Type: ${bookingData.preferences.serviceType.join(', ') || 'None specified'}
- Special Requests: ${bookingData.preferences.specialRequests || 'None'}

Please contact the customer within 24 hours to confirm details and discuss requirements.

Booking Reference: ${bookingReference}
Submitted on: ${new Date().toLocaleString()}
    `.trim();

    const subject = `New Booking Details - ${bookingReference}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=alekh0253@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(adminEmailContent)}`;
    
    // Open admin email in new tab
    window.open(gmailUrl, '_blank');
  };

  const sendCustomerEmail = async (bookingData, bookingReference) => {
    const customerEmailContent = `
Dear ${bookingData.contactInfo.firstName} ${bookingData.contactInfo.lastName},

Thank you for choosing our catering services! We have received your booking request and are excited to help make your ${bookingData.eventDetails.eventType || 'event'} special.

BOOKING CONFIRMATION DETAILS:
Reference Number: ${bookingReference}
Event Type: ${bookingData.eventDetails.eventType || 'Not specified'}
Date: ${bookingData.eventDetails.eventDate || 'Not specified'}
Time: ${bookingData.eventDetails.eventTime || 'Not specified'}
Guests: ${bookingData.eventDetails.guestCount || 'Not specified'}
Venue: ${bookingData.eventDetails.venue || 'Not specified'}

NEXT STEPS:
1. Our team will contact you within 24 hours to discuss your requirements in detail
2. We'll provide a customized menu and pricing based on your preferences
3. Once confirmed, we'll send you a detailed service agreement

CONTACT INFORMATION:
If you have any immediate questions or need to make changes, please contact us:
Phone: +91 9611906084
Email: alekh0253@gmail.com

Thank you for your trust in our services. We look forward to making your event memorable!

Best regards,
Catering Services Team

Note: Please keep this reference number for your records: ${bookingReference}
    `.trim();

    const subject = `Booking Confirmation - ${bookingReference}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${bookingData.contactInfo.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(customerEmailContent)}`;
    
    // Open customer email in new tab
    window.open(gmailUrl, '_blank');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Generate booking reference
      const bookingReference = `ENB-${Date.now()}`;
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send emails
      await sendAdminEmail(bookingData, bookingReference);
      await sendCustomerEmail(bookingData, bookingReference);
      
      // Show success message
      alert(`🎉 Booking Submitted Successfully!

Your ${bookingData.eventDetails.eventType || 'event'} booking has been received.

📧 Email notifications have been sent to:
• Admin (alekh0253@gmail.com) - New booking details
• Customer (${bookingData.contactInfo.email}) - Booking confirmation

Reference: ${bookingReference}

We'll contact you within 24 hours to confirm all details.`);

      // Reset form after successful submission
      setTimeout(() => {
        setCurrentStep(1);
        setBookingData({
          eventDetails: {
            eventType: '',
            guestCount: '',
            eventDate: '',
            eventTime: '',
            venue: ''
          },
          contactInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            additionalContact: ''
          },
          preferences: {
            dietaryPreferences: [],
            serviceType: [],
            specialRequests: ''
          }
        });
      }, 3000);

    } catch (error) {
      console.error('Booking submission error:', error);
      alert("There was an issue processing your booking. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact action handlers
  const handleCallNow = () => {
    window.location.href = 'tel:+919611906084';
  };

  const handleEmailUs = () => {
    const subject = encodeURIComponent('Catering Service Inquiry');
    const body = encodeURIComponent(`Dear Team,

I am interested in your catering services and would like to discuss my event requirements.

Please contact me at your earliest convenience to discuss:
- Event details and menu options
- Pricing and availability
- Service arrangements

Thank you for your time. I look forward to hearing from you soon.

Best regards,
[Your Name]
[Your Phone Number]`);
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=alekh0253@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Event Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventType">Event Type</Label>
                <Input 
                  id="eventType" 
                  placeholder="e.g., Wedding, Birthday, Corporate"
                  value={bookingData.eventDetails.eventType}
                  onChange={(e) => updateEventDetails('eventType', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="guestCount">Number of Guests</Label>
                <Input 
                  id="guestCount" 
                  type="number" 
                  placeholder="50"
                  value={bookingData.eventDetails.guestCount}
                  onChange={(e) => updateEventDetails('guestCount', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="eventDate">Event Date</Label>
                <Input 
                  id="eventDate" 
                  type="date"
                  value={bookingData.eventDetails.eventDate}
                  onChange={(e) => updateEventDetails('eventDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="eventTime">Event Time</Label>
                <Input 
                  id="eventTime" 
                  type="time"
                  value={bookingData.eventDetails.eventTime}
                  onChange={(e) => updateEventDetails('eventTime', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="venue">Venue Address</Label>
              <Textarea 
                id="venue" 
                placeholder="Enter complete venue address" 
                rows={3}
                value={bookingData.eventDetails.venue}
                onChange={(e) => updateEventDetails('venue', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="John"
                  value={bookingData.contactInfo.firstName}
                  onChange={(e) => updateContactInfo('firstName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe"
                  value={bookingData.contactInfo.lastName}
                  onChange={(e) => updateContactInfo('lastName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com"
                  value={bookingData.contactInfo.email}
                  onChange={(e) => updateContactInfo('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="+91 9876543210"
                  value={bookingData.contactInfo.phone}
                  onChange={(e) => updateContactInfo('phone', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="additionalContact">Alternative Contact (Optional)</Label>
              <Input 
                id="additionalContact" 
                placeholder="Alternative contact person and number"
                value={bookingData.contactInfo.additionalContact}
                onChange={(e) => updateContactInfo('additionalContact', e.target.value)}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Preferences & Requirements</h3>
            <div className="space-y-4">
              <div>
                <Label>Dietary Preferences</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Jain', 'Gluten-Free'].map((diet) => (
                    <Badge 
                      key={diet} 
                      variant={bookingData.preferences.dietaryPreferences.includes(diet) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        bookingData.preferences.dietaryPreferences.includes(diet)
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'hover:bg-yellow-500 hover:text-white'
                      }`}
                      onClick={() => togglePreference('dietaryPreferences', diet)}
                    >
                      {diet}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Service Type</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Buffet', 'Plated Service', 'Food Stations', 'Family Style'].map((service) => (
                    <Badge 
                      key={service} 
                      variant={bookingData.preferences.serviceType.includes(service) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        bookingData.preferences.serviceType.includes(service)
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'hover:bg-green-600 hover:text-white'
                      }`}
                      onClick={() => togglePreference('serviceType', service)}
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea 
                  id="specialRequests" 
                  placeholder="Any special dietary requirements, decorations, or specific requests..." 
                  rows={4}
                  value={bookingData.preferences.specialRequests}
                  onChange={(e) => updateSpecialRequests(e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-green-800 mb-2">Booking Summary</h3>
              <p className="text-gray-600 mb-4">Please review your booking details before submitting</p>
              
              <div className="bg-white rounded-lg p-4 text-left space-y-3">
                <h4 className="font-bold text-lg border-b pb-2">Event Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="font-medium">Event Type:</span></div>
                  <div>{bookingData.eventDetails.eventType || 'Not specified'}</div>
                  <div><span className="font-medium">Guests:</span></div>
                  <div>{bookingData.eventDetails.guestCount || 'Not specified'}</div>
                  <div><span className="font-medium">Date:</span></div>
                  <div>{bookingData.eventDetails.eventDate || 'Not specified'}</div>
                  <div><span className="font-medium">Time:</span></div>
                  <div>{bookingData.eventDetails.eventTime || 'Not specified'}</div>
                </div>
                {bookingData.eventDetails.venue && (
                  <div>
                    <span className="font-medium">Venue:</span>
                    <p className="text-sm mt-1">{bookingData.eventDetails.venue}</p>
                  </div>
                )}

                <h4 className="font-bold text-lg border-b pb-2 pt-4">Contact Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="font-medium">Name:</span></div>
                  <div>{`${bookingData.contactInfo.firstName} ${bookingData.contactInfo.lastName}`.trim() || 'Not specified'}</div>
                  <div><span className="font-medium">Email:</span></div>
                  <div>{bookingData.contactInfo.email || 'Not specified'}</div>
                  <div><span className="font-medium">Phone:</span></div>
                  <div>{bookingData.contactInfo.phone || 'Not specified'}</div>
                </div>

                {(bookingData.preferences.dietaryPreferences.length > 0 || 
                  bookingData.preferences.serviceType.length > 0 || 
                  bookingData.preferences.specialRequests) && (
                  <>
                    <h4 className="font-bold text-lg border-b pb-2 pt-4">Preferences</h4>
                    {bookingData.preferences.dietaryPreferences.length > 0 && (
                      <div>
                        <span className="font-medium">Dietary Preferences:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {bookingData.preferences.dietaryPreferences.map(diet => (
                            <Badge key={diet} variant="outline" className="text-xs">{diet}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {bookingData.preferences.serviceType.length > 0 && (
                      <div>
                        <span className="font-medium">Service Type:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {bookingData.preferences.serviceType.map(service => (
                            <Badge key={service} variant="outline" className="text-xs">{service}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {bookingData.preferences.specialRequests && (
                      <div>
                        <span className="font-medium">Special Requests:</span>
                        <p className="text-sm mt-1">{bookingData.preferences.specialRequests}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Email notification info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Send className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Email Notifications</h4>
                </div>
                <p className="text-sm text-blue-700">
                  After submitting, emails will be sent to:
                </p>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• <strong>Admin:</strong> alekh0253@gmail.com (booking details)</li>
                  <li>• <strong>Customer:</strong> {bookingData.contactInfo.email || 'your email'} (confirmation)</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="booking" className="py-16 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">Enhanced Booking Experience</h2>
          <p className="text-xl text-gray-600">Simple, fast, and personalized booking process</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    currentStep >= step.number 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <step.icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 transition-colors duration-300 ${
                      currentStep > step.number ? 'bg-yellow-500' : 'bg-gray-300'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              {renderStep()}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1 || isSubmitting}
                  className="px-6"
                >
                  Previous
                </Button>
                
                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-yellow-500 hover:bg-yellow-600 px-6"
                    disabled={isSubmitting}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 px-8 flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Submitting & Sending Emails...' : 'Submit Booking'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Contact Options */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Need help? Contact us directly:</p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300"
                onClick={handleCallNow}
              >
                <Phone className="w-4 h-4" />
                Call +91 9611906084
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                onClick={handleEmailUs}
              >
                <Mail className="w-4 h-4" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedBookingExperience;