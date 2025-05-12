export interface NavItem {
    id: string;
    label: string;
    icon: string;
    path: string;
  }
  
  export interface LeaveBalance {
    casual: number;
    sick: number;
    personal: number;
    total: number;
  }
  
  export interface AttendanceData {
    checkIn: string;
    checkOut: string | null;
    status: 'present' | 'absent' | 'late' | 'half-day';
  }
  
  export interface UserProfile {
    id: string;
    name: string;
    role: string;
    department: string;
    avatar: string;
  }