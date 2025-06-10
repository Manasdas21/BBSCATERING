
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';
// import { cn } from '@/lib/utils';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Scroll to section function
//   const scrollToSection = (sectionId: string) => {
//     // Close mobile menu if open
//     setIsOpen(false);
    
//     // If we're not on the homepage and the link is to a section
//     if (window.location.pathname !== '/' && sectionId.startsWith('#')) {
//       // Navigate to homepage first, then scroll to section after a short delay
//       window.location.href = `/${sectionId}`;
//       return;
//     }
    
//     // If already on homepage, just scroll to section
//     const element = document.getElementById(sectionId.replace('#', ''));
//     if (element) {
//       const headerOffset = 80; // Account for fixed header
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Handle home button click - go to top of home page
//   const handleHomeClick = () => {
//     setIsOpen(false);
    
//     if (window.location.pathname === '/') {
//       // If already on homepage, scroll to top
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       });
//     } else {
//       // If on another page, navigate to home
//       navigate('/');
//     }
//   };

//   const navLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'About', href: '#about' },
//     { name: 'Services', href: '#services' },
//     { name: 'Menu', href: '/menu' },
//     { name: 'Testimonials', href: '#testimonials' },
//     { name: 'Contact', href: '#contact' },
//   ];

//   return (
//     <nav className={cn(
//       'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
//       isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
//     )}>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <Link to="/" className="text-2xl font-playfair font-bold text-forest">
//               BBS Catering<span className="text-gold">.</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => {
//               if (link.name === 'Home') {
//                 return (
//                   <button
//                     key={link.name}
//                     onClick={handleHomeClick}
//                     className="text-gray-800 hover:text-gold transition-colors duration-200"
//                   >
//                     {link.name}
//                   </button>
//                 );
//               } else if (link.href.startsWith('#')) {
//                 return (
//                   <button
//                     key={link.name}
//                     onClick={() => scrollToSection(link.href)}
//                     className="text-gray-800 hover:text-gold transition-colors duration-200"
//                   >
//                     {link.name}
//                   </button>
//                 );
//               } else {
//                 return (
//                   <Link
//                     key={link.name}
//                     to={link.href}
//                     className="text-gray-800 hover:text-gold transition-colors duration-200"
//                   >
//                     {link.name}
//                   </Link>
//                 );
//               }
//             })}
//             <Link
//               to="/menu"
//               className="bg-gold hover:bg-gold/90 text-white px-4 py-2 rounded-md transition-colors duration-200"
//             >
//               Book Now
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden bg-white shadow-lg rounded-b-lg mt-2 py-4 px-2 animate-fade-in">
//             <div className="flex flex-col space-y-4">
//               {navLinks.map((link) => {
//                 if (link.name === 'Home') {
//                   return (
//                     <button
//                       key={link.name}
//                       onClick={handleHomeClick}
//                       className="text-gray-800 hover:text-gold px-4 py-2 rounded-md transition-colors duration-200 text-left"
//                     >
//                       {link.name}
//                     </button>
//                   );
//                 } else if (link.href.startsWith('#')) {
//                   return (
//                     <button
//                       key={link.name}
//                       onClick={() => scrollToSection(link.href)}
//                       className="text-gray-800 hover:text-gold px-4 py-2 rounded-md transition-colors duration-200 text-left"
//                     >
//                       {link.name}
//                     </button>
//                   );
//                 } else {
//                   return (
//                     <Link
//                       key={link.name}
//                       to={link.href}
//                       className="text-gray-800 hover:text-gold px-4 py-2 rounded-md transition-colors duration-200"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {link.name}
//                     </Link>
//                   );
//                 }
//               })}
//               <Link
//                 to="/menu"
//                 className="bg-gold hover:bg-gold/90 text-white px-4 py-2 rounded-md transition-colors duration-200 mx-4"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Book Now
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import React, { useState, useEffect } from 'react';
// import { Menu, X } from 'lucide-react';

// const cn = (...classes) => {
//   return classes.filter(Boolean).join(' ');
// };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Scroll to section function
//   const scrollToSection = (sectionId) => {
//     // Close mobile menu if open
//     setIsOpen(false);
    
//     // If we're not on the homepage and the link is to a section
//     if (window.location.pathname !== '/' && sectionId.startsWith('#')) {
//       // Navigate to homepage first, then scroll to section after a short delay
//       window.location.href = `/${sectionId}`;
//       return;
//     }
    
//     // If already on homepage, just scroll to section
//     const element = document.getElementById(sectionId.replace('#', ''));
//     if (element) {
//       const headerOffset = 80; // Account for fixed header
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });
//     } else {
//       console.log(`Element with ID '${sectionId.replace('#', '')}' not found`);
//     }
//   };

//   // Handle booking scroll - separate function for booking
//   const handleBookingClick = () => {
//     setIsOpen(false);
    
//     // If not on homepage, navigate to homepage first
//     if (window.location.pathname !== '/') {
//       window.location.href = '/#booking';
//       return;
//     }
    
//     // Small delay to ensure DOM is ready
//     setTimeout(() => {
//       const bookingElement = document.getElementById('booking');
//       if (bookingElement) {
//         const headerOffset = 80;
//         const elementPosition = bookingElement.getBoundingClientRect().top;
//         const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
//         window.scrollTo({
//           top: offsetPosition,
//           behavior: 'smooth'
//         });
//       } else {
//         console.log('Booking section not found');
//       }
//     }, 100);
//   };

//   // Handle home button click - go to top of home page
//   const handleHomeClick = () => {
//     setIsOpen(false);
    
//     if (window.location.pathname === '/') {
//       // If already on homepage, scroll to top
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       });
//     } else {
//       // If on another page, navigate to home
//       window.location.href = '/';
//     }
//   };

//   // Handle menu navigation
//   const handleMenuClick = () => {
//     setIsOpen(false);
//     window.location.href = '/menu';
//   };

//   const navLinks = [
//     { name: 'Home', action: handleHomeClick },
//     { name: 'About', action: () => scrollToSection('#about') },
//     { name: 'Photo Gallery', action: () => scrollToSection('#gallery') },
//     { name: 'Menu', action: handleMenuClick },
//     { name: 'Testimonials', action: () => scrollToSection('#testimonials') },
//     { name: 'Contact', action: () => scrollToSection('#contact') },
//   ];

//   return (
//     <nav className={cn(
//       'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
//       isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
//     )}>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center flex-shrink-0">
//             <button 
//               onClick={handleHomeClick} 
//               className="text-xl sm:text-2xl font-bold text-green-800 whitespace-nowrap"
//             >
//               BBS Catering<span className="text-yellow-500">.</span>
//             </button>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
//             {navLinks.map((link) => (
//               <button
//                 key={link.name}
//                 onClick={link.action}
//                 className="text-gray-800 hover:text-yellow-500 transition-colors duration-200 whitespace-nowrap"
//               >
//                 {link.name}
//               </button>
//             ))}
//             <button
//               onClick={handleBookingClick}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors duration-200 whitespace-nowrap"
//             >
//               Book Now
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button 
//               onClick={toggleMenu} 
//               className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 p-2"
//               aria-label="Toggle navigation menu"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={cn(
//           'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
//           isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//         )}>
//           <div className="bg-white border-t border-gray-200 shadow-lg">
//             <div className="flex flex-col py-2">
//               {navLinks.map((link) => (
//                 <button
//                   key={link.name}
//                   onClick={link.action}
//                   className="text-gray-800 hover:text-yellow-500 hover:bg-yellow-50 px-4 py-3 transition-colors duration-200 text-left border-b border-gray-100 last:border-b-0"
//                 >
//                   {link.name}
//                 </button>
//               ))}
//               <div className="px-4 py-3">
//                 <button
//                   onClick={handleBookingClick}
//                   className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-md transition-colors duration-200"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    if (window.location.pathname !== '/' && sectionId.startsWith('#')) {
      window.location.href = `/${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
      console.log(`Element '${sectionId}' not found`);
    }
  };

  const handleBookingClick = () => {
    setIsOpen(false);
    if (window.location.pathname !== '/') {
      window.location.href = '/#booking';
      return;
    }
    setTimeout(() => {
      const el = document.getElementById('booking');
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleHomeClick = () => {
    setIsOpen(false);
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/';
    }
  };

  const handleMenuClick = () => {
    setIsOpen(false);
    window.location.href = '/menu';
  };

  const navLinks = [
    { name: 'Home', action: handleHomeClick },
    { name: 'About', action: () => scrollToSection('#about') },
    { name: 'Photo Gallery', action: () => scrollToSection('#gallery') },
    { name: 'Menu', action: handleMenuClick },
    { name: 'Testimonials', action: () => scrollToSection('#testimonials') },
    { name: 'Contact', action: () => scrollToSection('#contact') },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={handleHomeClick}
              className="text-2xl font-bold text-green-800"
            >
              BBS Catering<span className="text-yellow-500">.</span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="text-gray-800 hover:text-yellow-500 transition-colors duration-200"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={handleBookingClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg mt-2 py-4 px-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="text-gray-800 hover:text-yellow-500 px-4 py-2 rounded-md text-left transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={handleBookingClick}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
