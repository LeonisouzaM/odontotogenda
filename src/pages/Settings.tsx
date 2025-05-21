// Add the Calendar import at the top of the file
import { Calendar } from "lucide-react";

// Fix the orientation property issue
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Cloud, CreditCard, Globe, Lock, Mail, MessagesSquare, Moon, Palette, Settings2, User, Users } from 'lucide-react';

export default function Settings() {
  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 flex-shrink-0">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-lg">Categorias</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-250px)]">
                  <TabsList className="flex flex-col w-full rounded-none">
                    <TabsTrigger value="profile" className="justify-start px-4 py-2 data-[state=active]:bg-muted">
                      <User className="h-4 w-4 mr-2" />
                      Perfil
                    </TabsTrigger>
                    <TabsTrigger value="security" className="justify-start px-4 py-2 data-[state=active]:bg-muted">
                      <Lock className="h-4 w-4 mr-2" />
                      Segurança
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="justify-start px-4 py-2 data-[state=active]:bg-muted">
                      <Mail className="h-4 w-4 mr-2" />
                      Notificações
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="justify-start px-4 py-2 data-[state=active]:bg-muted">
                      <Palette className="h-4 w-4 mr-2" />
                      Aparência
                    </TabsTrigger>
                    <TabsTrigger value="clinic" className="justify-start px-4 py-2 data-[state=active]:bg-muted">
                      <Users className="h-4 w-4 mr-2" />
                      Clínica
                    </TabsTrigger>
                    <TabsTrigger value="subscription" className="justify-start px-4 py-2 data-[state=active]:bg-muted">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Assinatura
                    </TabsTrigger>
                    <TabsTrigger value="integrations" className="justify-start px-4 py-2 data-[state=active]:bg-muted">
                      <Globe className="h-4 w-4 mr-2" />
                      Integrações
                    </TabsTrigger>
                    <TabsTrigger value="backup" className="justify-start px-4 py-2 data-[state=active]:bg-muted">
                      <Cloud className="h-4 w-4 mr-2" />
                      Backup
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="justify-start px-4 py-2 data-[state=active]:bg-muted">
                      <Settings2 className="h-4 w-4 mr-2" />
                      Avançado
                    </TabsTrigger>
                  </TabsList>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1">
            <Card>
              <TabsContent value="profile">
                <CardHeader>
                  <CardTitle>Perfil</CardTitle>
                  <CardDescription>
                    Gerencie suas informações pessoais e da sua conta.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informações Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input id="firstName" placeholder="Seu nome" defaultValue="Dr. André" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input id="lastName" placeholder="Seu sobrenome" defaultValue="Silva" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="seu@email.com" defaultValue="dr.andre@exemplo.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" placeholder="(00) 00000-0000" defaultValue="(11) 98765-4321" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informações Profissionais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cro">CRO</Label>
                        <Input id="cro" placeholder="Seu CRO" defaultValue="SP-12345" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="speciality">Especialidade</Label>
                        <Input id="speciality" placeholder="Sua especialidade" defaultValue="Ortodontia" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="security">
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>
                    Gerencie sua senha e configurações de segurança.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alterar Senha</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Senha Atual</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nova Senha</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirme a Nova Senha</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Autenticação de Dois Fatores</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="2fa">Ativar Autenticação de Dois Fatores</Label>
                        <p className="text-sm text-gray-500">Adicione uma camada extra de segurança à sua conta.</p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sessões Ativas</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Windows 10 - Chrome</p>
                          <p className="text-sm text-gray-500">São Paulo, Brasil • Ativa agora</p>
                        </div>
                        <Button variant="outline" size="sm">Encerrar</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">iPhone 13 - Safari</p>
                          <p className="text-sm text-gray-500">São Paulo, Brasil • 5 horas atrás</p>
                        </div>
                        <Button variant="outline" size="sm">Encerrar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="notifications">
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>
                    Configure como deseja receber notificações.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-appointments">Agendamentos</Label>
                          <p className="text-sm text-gray-500">Notificações sobre novos agendamentos e alterações.</p>
                        </div>
                        <Switch id="email-appointments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-reminders">Lembretes</Label>
                          <p className="text-sm text-gray-500">Lembretes sobre consultas próximas.</p>
                        </div>
                        <Switch id="email-reminders" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-marketing">Marketing</Label>
                          <p className="text-sm text-gray-500">Atualizações sobre novos recursos e ofertas.</p>
                        </div>
                        <Switch id="email-marketing" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sistema</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="system-appointments">Agendamentos</Label>
                          <p className="text-sm text-gray-500">Notificações no sistema sobre novos agendamentos.</p>
                        </div>
                        <Switch id="system-appointments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="system-updates">Atualizações</Label>
                          <p className="text-sm text-gray-500">Notificações sobre atualizações do sistema.</p>
                        </div>
                        <Switch id="system-updates" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="appearance">
                <CardHeader>
                  <CardTitle>Aparência</CardTitle>
                  <CardDescription>
                    Personalize a aparência do sistema.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tema</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 cursor-pointer bg-white text-center flex flex-col items-center hover:border-blue-500">
                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                          <Sun className="h-6 w-6 text-gray-600" />
                        </div>
                        <span>Claro</span>
                      </div>
                      <div className="border rounded-lg p-4 cursor-pointer bg-gray-900 text-white text-center flex flex-col items-center hover:border-blue-500">
                        <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mb-2">
                          <Moon className="h-6 w-6 text-gray-300" />
                        </div>
                        <span>Escuro</span>
                      </div>
                      <div className="border rounded-lg p-4 cursor-pointer bg-gradient-to-b from-white to-gray-900 text-center flex flex-col items-center hover:border-blue-500">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-b from-gray-100 to-gray-700 flex items-center justify-center mb-2">
                          <Settings2 className="h-6 w-6 text-gray-500" />
                        </div>
                        <span className="text-gray-700">Sistema</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Cor Principal</h3>
                    <div className="grid grid-cols-6 gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-500 cursor-pointer ring-2 ring-offset-2 ring-blue-500"></div>
                      <div className="h-10 w-10 rounded-full bg-green-500 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-purple-500 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-pink-500 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-orange-500 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-teal-500 cursor-pointer"></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="clinic">
                <CardHeader>
                  <CardTitle>Clínica</CardTitle>
                  <CardDescription>
                    Gerencie as informações da sua clínica.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informações Básicas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clinicName">Nome da Clínica</Label>
                        <Input id="clinicName" placeholder="Nome da clínica" defaultValue="Clínica Odontológica Silva" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input id="cnpj" placeholder="00.000.000/0000-00" defaultValue="12.345.678/0001-90" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" placeholder="(00) 0000-0000" defaultValue="(11) 3456-7890" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="clinica@email.com" defaultValue="contato@clinicasilva.com.br" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Endereço</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Rua</Label>
                        <Input id="street" placeholder="Endereço da clínica" defaultValue="Av. Paulista" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="number">Número</Label>
                        <Input id="number" placeholder="Número" defaultValue="1000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input id="complement" placeholder="Complemento" defaultValue="Sala 501" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input id="neighborhood" placeholder="Bairro" defaultValue="Bela Vista" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input id="city" placeholder="Cidade" defaultValue="São Paulo" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado</Label>
                        <Input id="state" placeholder="Estado" defaultValue="SP" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">CEP</Label>
                        <Input id="zipCode" placeholder="00000-000" defaultValue="01310-100" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="subscription">
                <CardHeader>
                  <CardTitle>Assinatura</CardTitle>
                  <CardDescription>
                    Gerencie seu plano e informações de pagamento.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h3 className="font-medium">Plano Atual: <span className="text-blue-700">Premium</span></h3>
                        <p className="text-sm text-gray-600">Próxima cobrança em 15/06/2023</p>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Recursos incluídos:</span>
                          <ul className="mt-1 space-y-1">
                            <li className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              Agendamentos ilimitados
                            </li>
                            <li className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              Cadastro de até 1.000 pacientes
                            </li>
                            <li className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              5 usuários simultâneos
                            </li>
                            <li className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              Backups automáticos
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">R$ 129,90<span className="text-gray-500 font-normal">/mês</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informações de Pagamento</h3>
                    <div className="flex items-center border p-3 rounded-lg">
                      <div className="h-8 w-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded mr-3"></div>
                      <div className="flex-1">
                        <p>Mastercard terminando em 4321</p>
                        <p className="text-xs text-gray-500">Expira em 12/25</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Alterar</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Histórico de Faturamento</h3>
                    <div className="border rounded-lg divide-y">
                      <div className="flex justify-between items-center p-3 hover:bg-gray-50">
                        <div>
                          <p className="font-medium">Fatura #12345</p>
                          <p className="text-xs text-gray-500">15/05/2023</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-4 text-green-500 text-sm font-medium">Pago</span>
                          <Button variant="outline" size="sm">Ver</Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 hover:bg-gray-50">
                        <div>
                          <p className="font-medium">Fatura #12344</p>
                          <p className="text-xs text-gray-500">15/04/2023</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-4 text-green-500 text-sm font-medium">Pago</span>
                          <Button variant="outline" size="sm">Ver</Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 hover:bg-gray-50">
                        <div>
                          <p className="font-medium">Fatura #12343</p>
                          <p className="text-xs text-gray-500">15/03/2023</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-4 text-green-500 text-sm font-medium">Pago</span>
                          <Button variant="outline" size="sm">Ver</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancelar Assinatura</Button>
                  <Button>Alterar Plano</Button>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="integrations">
                <CardHeader>
                  <CardTitle>Integrações</CardTitle>
                  <CardDescription>
                    Conecte sua conta com outros serviços.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessagesSquare className="h-8 w-8 text-green-500" />
                        <div>
                          <h3 className="font-medium">WhatsApp</h3>
                          <p className="text-sm text-gray-500">Envie lembretes e notificações por WhatsApp</p>
                        </div>
                      </div>
                      <Button variant="outline">Conectar</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-8 w-8 text-blue-500" />
                        <div>
                          <h3 className="font-medium">Google Calendar</h3>
                          <p className="text-sm text-gray-500">Sincronize agendamentos com seu Google Calendar</p>
                        </div>
                      </div>
                      <Button variant="outline" className="bg-gray-100">Conectado</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-8 w-8 text-red-500" />
                        <div>
                          <h3 className="font-medium">Mailchimp</h3>
                          <p className="text-sm text-gray-500">Integre com Mailchimp para campanhas de email</p>
                        </div>
                      </div>
                      <Button variant="outline">Conectar</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="backup">
                <CardHeader>
                  <CardTitle>Backup</CardTitle>
                  <CardDescription>
                    Configure e gerencie backups dos seus dados.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Configurações de Backup</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-backup">Backup Automático</Label>
                          <p className="text-sm text-gray-500">Realize backups automaticamente</p>
                        </div>
                        <Switch id="auto-backup" defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="backup-frequency">Frequência</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline" size="sm" className="bg-blue-50">Diário</Button>
                          <Button variant="outline" size="sm">Semanal</Button>
                          <Button variant="outline" size="sm">Mensal</Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="backup-time">Horário</Label>
                        <Input id="backup-time" type="time" defaultValue="02:00" />
                        <p className="text-xs text-gray-500">Recomendamos agendar backups em horários de baixo uso do sistema</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Backups Disponíveis</h3>
                      <Button variant="outline" size="sm">Fazer Backup Agora</Button>
                    </div>
                    <div className="border rounded-lg divide-y">
                      <div className="flex justify-between items-center p-3 hover:bg-gray-50">
                        <div>
                          <p className="font-medium">Backup Completo</p>
                          <p className="text-xs text-gray-500">18/05/2023 02:00</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Restaurar</Button>
                          <Button variant="outline" size="sm">Baixar</Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 hover:bg-gray-50">
                        <div>
                          <p className="font-medium">Backup Completo</p>
                          <p className="text-xs text-gray-500">17/05/2023 02:00</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Restaurar</Button>
                          <Button variant="outline" size="sm">Baixar</Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 hover:bg-gray-50">
                        <div>
                          <p className="font-medium">Backup Completo</p>
                          <p className="text-xs text-gray-500">16/05/2023 02:00</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Restaurar</Button>
                          <Button variant="outline" size="sm">Baixar</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="advanced">
                <CardHeader>
                  <CardTitle>Configurações Avançadas</CardTitle>
                  <CardDescription>
                    Configure opções avançadas do sistema.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Opções Avançadas</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="debug-mode">Modo de Depuração</Label>
                          <p className="text-sm text-gray-500">Ativa logs detalhados para solução de problemas</p>
                        </div>
                        <Switch id="debug-mode" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="analytics">Compartilhar Análises</Label>
                          <p className="text-sm text-gray-500">Compartilha dados de uso anônimos para melhorar o sistema</p>
                        </div>
                        <Switch id="analytics" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="experimental">Recursos Experimentais</Label>
                          <p className="text-sm text-gray-500">Habilita recursos em fase de teste</p>
                        </div>
                        <Switch id="experimental" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Exportar Dados</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500">Exporte todos os dados do sistema em diferentes formatos.</p>
                      <div className="flex gap-2">
                        <Button variant="outline">Exportar como CSV</Button>
                        <Button variant="outline">Exportar como JSON</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-red-600">Zona de Perigo</h3>
                    <div className="space-y-3">
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <h4 className="font-medium text-red-600">Limpar Dados</h4>
                        <p className="text-sm text-gray-600 mt-1">Esta ação irá remover permanentemente todos os dados do sistema. Esta ação não pode ser desfeita.</p>
                        <Button variant="destructive" className="mt-3">Limpar Todos os Dados</Button>
                      </div>
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg mt-4">
                        <h4 className="font-medium text-red-600">Excluir Conta</h4>
                        <p className="text-sm text-gray-600 mt-1">Esta ação irá excluir permanentemente sua conta e todos os dados associados. Esta ação não pode ser desfeita.</p>
                        <Button variant="destructive" className="mt-3">Excluir Minha Conta</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

function Sun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
