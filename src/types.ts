/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  originalPrice?: string;
  duration: string;
  studentsCount: string;
  rating: number;
  image: string;
  tag: string;
  syllabus: string[];
}

export interface BakeryProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  tag: string;
  image: string;
  flavorProfile: string[];
  textureNotes: string;
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  studentName: string;
  businessName: string;
  quote: string;
  achievement: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
