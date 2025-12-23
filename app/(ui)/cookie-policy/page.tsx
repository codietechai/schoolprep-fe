import { DownTriangleIcon } from '@/components/userui/components/icons/icon';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s | Test Prep',
    default: 'Cookie Policy',
  },
  description: 'kdkdk ddk ddkkd',
  openGraph: {
    title: 'Test Prep - Cookie Policy',
    description: 'Prepare for your exams with the best resources and tools.',
    url: '/cookie-policy',
    siteName: 'Test Prep',
    images: [
      {
        url: 'https://weblianz.com/images/og-image-all.jpg',
        width: 1200,
        height: 630,
        alt: 'Test Prep Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

const page = () => {
  const data = [
    {
      title: 'Introduction',
      description:
        'Welcome to [Your Website Name] ("the Website"). These terms and conditions outline the rules and regulations for the use of [Your Company Name]’s Website, located at [Your Website URL].',
    },
    {
      title: 'Information We Collect',
      description: 'We may collect and process the following data about you:',
      points: [
        'Personal Identification Information: Name, email address, phone number, etc.',
        'Financial Information: Payment details for course enrollments.',
        'Technical Data: IP address, browser type, operating system, etc.',
        'Usage Data: Information about how you use our website and services.',
      ],
    },
    {
      title: 'Services Provided',
      description:
        'The Website provides online courses in nursing, medical, and pharmacy fields ("the Services"). The courses are intended for educational purposes and do not replace professional training or certification.',
    },
    {
      title: 'User Accounts',
      description:
        'To access certain features of the Services, you must register for an account. You must provide accurate and complete information and keep your account information updated. You are responsible for maintaining the confidentiality of your account and password.',
    },
    {
      title: 'Intellectual Property',
      description:
        'Unless otherwise stated, [Your Company Name] and/or its licensors own the intellectual property rights for all material on the Website. All intellectual property rights are reserved. You may access this from the Website for your own personal use subjected to restrictions set in these terms and conditions.',
    },
    {
      title: 'User Content',
      description:
        'Users may submit content to the Website, including but not limited to, course reviews, discussion posts, and other materials. By submitting content, you grant [Your Company Name] a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute the content in connection with the Services.',
    },
    {
      title: 'Prohibited Activities',
      description: 'You agree not to:',
      points: [
        'Violate any applicable laws or regulations.',
        'Use the Website to harm or attempt to harm minors in any way.',
        'Transmit or distribute any unsolicited or unauthorized advertising, promotional materials, or any other form of solicitation.',
        "Engage in any conduct that restricts or inhibits any other user's enjoyment of the Website.",
      ],
    },

    {
      title: 'Limitation of Liability',
      description:
        'To the fullest extent permitted by applicable law, [Your Company Name] shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Website.',
    },
    {
      title: 'Termination',
      description:
        'We may terminate or suspend your account and bar access to the Website immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.',
    },
    {
      title: 'Governing Law',
      description:
        'These terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.',
    },
    {
      title: 'Changes to Terms',
      description:
        'We reserve the right to modify or replace these Terms at any time. It is your responsibility to check this page periodically for changes. Your continued use of the Website following the posting of any changes to these Terms constitutes acceptance of those changes.',
    },
    {
      title: 'Contact Information',
      description:
        'If you have any questions about these Terms, please contact us at [Your Contact Information].',
    },
  ];
  return (
    <div className="res-padding responsive max-w-[1280px]">
      <h2 className="heading">Cookie Policy</h2>
      {data.map((item, i) => (
        <div className="mt-8">
          <h2 className="tertiary-text font-bold text-black">
            {i + 1}. {item.title}
          </h2>
          <p className="mt-2 text-base">{item.description}</p>
          {item.points && (
            <ul>
              {item.points.map(point => (
                <div className="flex items-center gap-2">
                  <DownTriangleIcon />
                  <li className="my-2">{point}</li>
                </div>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default page;
