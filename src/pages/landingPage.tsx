import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Coffee, Store, Users, Clock, Shield } from 'lucide-react';

export const LandingPage = () => {
  const features = [
    {
      icon: Utensils,
      title: 'Restaurant Management',
      description: 'Manage orders, kitchen operations, tables, and staff efficiently',
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
    {
      icon: Coffee,
      title: 'Bakery Management',
      description: 'Track production batches, coffee inventory, and pastry sales',
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      icon: Store,
      title: 'Decoration Showroom',
      description: 'Manage product displays, inventory, and gift services',
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ];

  const benefits = [
    { icon: Users, text: 'Credential-based staff management' },
    { icon: Clock, text: 'Real-time order tracking' },
    { icon: Shield, text: 'Role-based access control' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-backdrop-blur:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-restaurant-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-bold text-restaurant-700">NapGroup</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" className="hidden sm:inline-flex">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="bg-restaurant-600 hover:bg-restaurant-700 text-black font-semibold hidden sm:inline-flex">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Unified Management System for{' '}
            <span className="text-restaurant-600">Restaurant</span>,{' '}
            <span className="text-amber-500">Bakery</span> &{' '}
            <span className="text-purple-500">Decoration</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            One platform to manage all your operations. Real-time tracking, 
            multi-department orders, and seamless integration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button  variant="outline" size="lg" className="bg-restaurant-600 hover:bg-restaurant-700 text-lg px-8 text-black font-semibold">
                Start Free Trial
                <span className="ml-2">→</span>
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Cards */}
      <section className="container mx-auto px-4 py-16 bg-gray-50 rounded-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          All-in-One Management Platform
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 ${feature.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-restaurant-50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose NapGroup?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 justify-center">
                <benefit.icon className="w-8 h-8 text-restaurant-600" />
                <span className="text-lg font-medium text-gray-700">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-restaurant-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-restaurant-700">NPGROUP</span>
            </div>
            <p className="text-sm text-gray-500 mt-4 md:mt-0">
              © 2026 NPGROUP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};