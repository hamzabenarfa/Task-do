"use client"
import useAuthCheck from "@/hooks/useAuthCheck";

export default function MainLayout({ children } : { children : React.ReactNode }) {
    const isAuthChecked = useAuthCheck(); 
    if (!isAuthChecked) {
        return <div></div>; 
    }
  return (
      <main>
        {children}
      </main> 
  );
}
