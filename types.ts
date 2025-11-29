import React from 'react';

export type ViewState = 
  | 'public-home' 
  | 'public-booking' 
  | 'public-promotions' 
  | 'public-contact' 
  | 'client-bookings' 
  | 'client-profile'
  | 'admin-dashboard' 
  | 'admin-reservations' 
  | 'admin-financial' 
  | 'admin-settings' 
  | 'admin-clients' 
  | 'login';

export interface Reservation {
  id: string;
  clientName: string;
  court: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  amount: number;
}

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: React.ReactNode;
}

export interface Court {
  id: string;
  name: string;
  type: 'Beach Tennis' | 'Vôlei' | 'Futevôlei';
}