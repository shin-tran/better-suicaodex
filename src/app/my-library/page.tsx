import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleUser, CloudOff, Terminal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export function generateMetadata(): Metadata {
  return {
    title: "Thư viện - SuicaoDex",
    // description: "Thư viện",
    // keywords: ["Lịch sử", "History", "SuicaoDex"],
  };
}
export default function Page() {
  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        <h1 className="text-2xl font-black uppercase">Thư viện</h1>
      </div>

      <Tabs defaultValue="local" className="mt-4">
        <TabsList className="w-full">
          <TabsTrigger className="w-full flex items-center" value="local">
            <CloudOff size={16} className="mr-1" />
            Từ thiết bị
          </TabsTrigger>
          <TabsTrigger className="w-full flex items-center" value="cloud">
            <CircleUser size={16} className="mr-1" />
            Từ tài khoản
          </TabsTrigger>
        </TabsList>
        <TabsContent value="local">
          <Alert className="rounded-sm bg-secondary">
            <Terminal size={18} />
            <AlertTitle>Có thể bạn cần biết:</AlertTitle>
            <AlertDescription>
              Đây là thư viện được lưu trên chính thiết bị của bạn, nó không
              đồng bộ với thư viện lưu trên tài khoản. Nếu bạn xóa dữ liệu trình
              duyệt, thư viện này cũng sẽ bị xóa theo.
              <br />
              Ngoài ra, mỗi danh mục chỉ lưu tối đa 500 truyện, khi lưu thêm sẽ
              tự động xóa truyện cũ nhất.
            </AlertDescription>
          </Alert>
        </TabsContent>
        <TabsContent value="cloud">
          <Alert className="rounded-sm bg-secondary justify-center text-center">
            Chức năng đang phát triển!
          </Alert>
        </TabsContent>
      </Tabs>
    </>
  );
}
