import type { ReactNode } from 'react';
import { AuthProvider } from '../../features/auth/context/AuthProvider';
import { EmployeesProvider } from '../../features/employees/context/EmployeesProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <EmployeesProvider>{children}</EmployeesProvider>
    </AuthProvider>
  );
}
