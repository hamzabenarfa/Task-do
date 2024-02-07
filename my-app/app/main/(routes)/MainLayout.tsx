import Header from "./_components/header";
import Menu from "./_components/menu";

export default function MainLayout({
  children,
  headerTitle, 
  menuUpdateData, 
}: {
  children: React.ReactNode;
  headerTitle: string;
  menuUpdateData: () => void;
}) {
  return (
    <div className="flex flex-col justify-between  min-h-screen">
       <div>
        <Header title={headerTitle}/> 
          {children}
       </div>
        <Menu updateData={menuUpdateData}/>
    </div>
  );
}
