
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Users, 
  TrendingUp, 
  LogOut,
  Search,
  Filter,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { LeadHistory } from "@/components/dashboard/LeadHistory";
import { Lead } from "@/types/lead";

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClassificacao, setFilterClassificacao] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login");
      return;
    }
    const currentUserData = JSON.parse(user);
    setCurrentUser(currentUserData);

    const storedLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    const leadsWithStatus: Lead[] = storedLeads.map((lead: any) => ({
      ...lead,
      status: (lead.status as Lead["status"]) || "novo"
    }));
    setLeads(leadsWithStatus);
    setFilteredLeads(leadsWithStatus);
  }, [navigate]);

  useEffect(() => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.telefone.includes(searchTerm)
      );
    }

    if (filterClassificacao !== "all") {
      filtered = filtered.filter(lead => lead.classificacao === filterClassificacao);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(lead => lead.status === filterStatus);
    }

    setFilteredLeads(filtered);
  }, [leads, searchTerm, filterClassificacao, filterStatus]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead["status"], responsavel?: string) => {
    const targetStatuses = ["contatado", "interesse", "fechado"];
    
    if (newStatus && targetStatuses.includes(newStatus)) {
      // Encontrar o lead que será atualizado
      const leadToUpdate = leads.find(lead => lead.id === leadId);
      if (leadToUpdate && currentUser) {
        // Atualizar o lead com as novas informações
        const updatedLead = {
          ...leadToUpdate,
          status: newStatus,
          responsavel: currentUser.nome,
          dataStatusChange: new Date().toISOString()
        };

        // Adicionar ao histórico do usuário atual
        const currentHistory = JSON.parse(localStorage.getItem(`lead_history_${currentUser.id}`) || "[]");
        const newHistory = [updatedLead, ...currentHistory];
        localStorage.setItem(`lead_history_${currentUser.id}`, JSON.stringify(newHistory));
        
        // Remover da lista principal de leads
        const leadsWithoutUpdated = leads.filter(lead => lead.id !== leadId);
        setLeads(leadsWithoutUpdated);
        localStorage.setItem("leads", JSON.stringify(leadsWithoutUpdated));
        
        toast({
          title: "Lead movido para histórico",
          description: `O lead ${updatedLead.nome} foi movido para seu histórico pessoal.`,
        });
        return;
      }
    }
    
    // Para outros status (novo, perdido), apenas atualizar sem mover
    const updatedLeads = leads.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            status: newStatus, 
            responsavel: responsavel || currentUser?.nome,
            dataStatusChange: new Date().toISOString()
          }
        : lead
    );
    
    setLeads(updatedLeads);
    localStorage.setItem("leads", JSON.stringify(updatedLeads));
    
    toast({
      title: "Status atualizado",
      description: "O status do lead foi atualizado com sucesso.",
    });
  };

  const leadsPorClassificacao = {
    quente: leads.filter(l => l.classificacao === "quente").length,
    morno: leads.filter(l => l.classificacao === "morno").length,
    frio: leads.filter(l => l.classificacao === "frio").length
  };

  const leadsPorStatus = {
    novo: leads.filter(l => l.status === "novo").length,
    contatado: leads.filter(l => l.status === "contatado").length,
    interesse: leads.filter(l => l.status === "interesse").length,
    fechado: leads.filter(l => l.status === "fechado").length,
    perdido: leads.filter(l => l.status === "perdido").length
  };

  const handleExportLeads = () => {
    const csvContent = [
      ['Nome', 'Email', 'Telefone', 'Idade', 'Cidade', 'Bairro', 'Tipo Plano', 'Urgência', 'Classificação', 'Status', 'Data Captura'],
      ...filteredLeads.map(lead => [
        lead.nome,
        lead.email,
        lead.telefone,
        lead.idade,
        lead.cidade,
        lead.bairro || '',
        lead.tipoPlano,
        lead.urgencia,
        lead.classificacao,
        lead.status || 'novo',
        new Date(lead.dataCaptura).toLocaleDateString('pt-BR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'leads.csv';
    link.click();

    toast({
      title: "Leads exportados",
      description: "Os leads foram exportados com sucesso.",
    });
  };

  if (!currentUser) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              HealthLead Pro
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Olá, <strong>{currentUser.nome}</strong>
            </span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leads.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Quentes</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{leadsPorClassificacao.quente}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Mornos</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{leadsPorClassificacao.morno}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversões</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{leadsPorStatus.fechado}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros e Ações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, email ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterClassificacao} onValueChange={setFilterClassificacao}>
                <SelectTrigger>
                  <SelectValue placeholder="Classificação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="quente">Quente</SelectItem>
                  <SelectItem value="morno">Morno</SelectItem>
                  <SelectItem value="frio">Frio</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="novo">Novo</SelectItem>
                  <SelectItem value="contatado">Contatado</SelectItem>
                  <SelectItem value="interesse">Com Interesse</SelectItem>
                  <SelectItem value="fechado">Fechado</SelectItem>
                  <SelectItem value="perdido">Perdido</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleExportLeads} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar CSV
              </Button>

              <div className="text-sm text-gray-600 flex items-center">
                <strong>{filteredLeads.length}</strong>&nbsp;leads encontrados
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="leads">Leads Ativos</TabsTrigger>
            <TabsTrigger value="history">Meu Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-0">
            <Card>
              <CardHeader>
                <CardTitle>Leads Capturados</CardTitle>
                <CardDescription>
                  Gerencie e acompanhe todos os seus leads de plano de saúde
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeadsTable
                  leads={filteredLeads}
                  onUpdateStatus={updateLeadStatus}
                  currentUser={currentUser}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-0">
            <LeadHistory currentUser={currentUser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
