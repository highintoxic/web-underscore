import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, MessageSquare, Clock, Globe2, Code, Palette, Database } from 'lucide-react';
import TeamMemberCard from './TeamMemberCard';
import deep from '../Assets/deep.jpg';
import kuruv from '../Assets/kuruv.jpg';
import hitarth from '../Assets/hitarth.jpg';
import { BaseLayout } from '../Layouts';

const ContactPage = () => {
  return (
    <BaseLayout>
    <div className="min-h-screen  overflow-hidden">
      {/* Hero Section with animated gradient background */}
      <div className="relative animate-gradient-x bg-gradient-to-r from-blue-500 to-blue-600 text-white pb-40 pt-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-6xl md:text-7xl font-bold text-center mb-8 animate-float ">
            Get in Touch
          </h1>
          <p className="text-2xl text-center max-w-3xl mx-auto opacity-90 mb-20">
            We're here to help and answer any questions you might have. We look forward to hearing from you!
          </p>
          <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center animate-bounce">
              <MessageSquare className="w-16 h-16 text-[rgb(0,212,142)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto px-4 pt-56 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Mail, title: 'Email Us', lines: ['deepdblm@outlook.com', 'u23ai052@coed.svnit.ac.in'] },
            { icon: Phone, title: 'Call Us', lines: ['+91 99740 19394', 'Mon-Fri: 9:00 AM - 6:00 PM'] },
            { icon: MapPin, title: 'Visit Us', lines: ['Sardar Vallabhbhai National Institute of Technology, Surat - 395007'] }
          ].map((item, index) => (
            <div key={index} className="relative group animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="absolute inset-0 bg-[rgb(0,212,142)] rounded-lg transform transition-all duration-300 group-hover:scale-105 opacity-0 group-hover:opacity-5"></div>
              <div className="glass-effect p-8 rounded-lg shadow-md text-center card-hover relative z-10">
                <div className="relative">
                  <div className="w-16 h-16 bg-[rgba(0,212,142,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-[rgb(0,212,142)] icon-hover" />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-[rgb(0,212,142)] animate-pulse-ring"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2 gradient-text">{item.title}</h3>
                {item.lines.map((line, i) => (
                  <p key={i} className="text-gray-600">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="glass-effect rounded-lg shadow-lg p-12 mb-16 transform hover:scale-[1.02] transition-all duration-500">
          <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Our Mission</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 mb-12 text-center leading-relaxed text-lg">
              We are committed to delivering exceptional value through innovative solutions that empower businesses and individuals to achieve their full potential. Our dedication to excellence, sustainability, and customer satisfaction drives everything we do.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Clock, title: '24/7 Support', desc: 'Always here when you need us' },
                { icon: Globe2, title: 'Global Reach', desc: 'Serving clients worldwide' },
                { icon: MessageSquare, title: 'Expert Consultation', desc: 'Professional guidance always' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center group animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="relative">
                    <item.icon className="w-12 h-12 text-[rgb(0,212,142)] transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    <div className="absolute inset-0 bg-[rgb(0,212,142)] opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 mt-4 gradient-text">{item.title}</h3>
                  <p className="text-gray-600 text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="glass-effect rounded-lg shadow-lg p-12">
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                name: 'Deep Das',
                role: 'AI Developer',
                image: deep,
                description: 'Deep is an expert in artificial intelligence and machine learning, with a passion for solving complex problems.',
                Icon: Code
              },
              {
                name: 'Kuruv Patel',
                role: 'Backend Developer',
                image: kuruv,
                description: 'Kuruv specializes in building scalable backend systems and has architected solutions for Fortune 500 companies.',
                Icon: Palette
              },
              {
                name: 'Hitarth Shah',
                role: 'Frontend Developer',
                image: hitarth,
                description: 'Hitarth the ultimate Frontend guy you may imagine.',
                Icon: Database
              }
            ].map((member, index) => (
              <TeamMemberCard
                key={index}
                {...member}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </BaseLayout>
  );
};

export default ContactPage;