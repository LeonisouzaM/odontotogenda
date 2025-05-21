
import { useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinanceOverview from "@/components/Finance/FinanceOverview";
import IncomeTable from "@/components/Finance/IncomeTable";
import ExpensesTable from "@/components/Finance/ExpensesTable";
import FinancialReports from "@/components/Finance/FinancialReports";

export default function Finance() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-1">Financeiro</h1>
          <p className="text-gray-500 mb-6">Gestão financeira da clínica</p>
          
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="income">Receitas</TabsTrigger>
              <TabsTrigger value="expenses">Despesas</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <FinanceOverview />
            </TabsContent>
            
            <TabsContent value="income" className="space-y-4">
              <IncomeTable />
            </TabsContent>
            
            <TabsContent value="expenses" className="space-y-4">
              <ExpensesTable />
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-4">
              <FinancialReports />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
