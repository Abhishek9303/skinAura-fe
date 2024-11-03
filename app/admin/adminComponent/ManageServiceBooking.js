import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import adminProtectedRoute from "@/store/admin/adminProtectedRoute";
import ServiceComponent from "@/app/admin/serviceComponent/serviceComponent";
const ManageServiceBooking = () => {
  return (
    <>
      <Tabs defaultValue="prp" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="prp">PRP</TabsTrigger>
          <TabsTrigger value="skin">Skin</TabsTrigger>
          <TabsTrigger value="hair">Hair</TabsTrigger>
        </TabsList>
        <TabsContent value="prp" >
            <ServiceComponent type={'prp'}/>
        </TabsContent>
        <TabsContent value="skin" type={'skin'}>
            <ServiceComponent type={'skin'}/>
        </TabsContent>
        <TabsContent value="hair" type={'hair'}>
            <ServiceComponent type={'hair'}/>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default adminProtectedRoute(ManageServiceBooking);
