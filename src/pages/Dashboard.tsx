
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
  Phone, 
  Mail, 
  MapPin, 
  LogOut,
  Search,
  Filter,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  idade: string;
  renda: string;
  cidade: string;
  tipoPlano: string;
  urgencia: string;
  comentarios: string;
  classificacao: "quente" | "morno" | "frio";
  dataCaptura: string;
  status?: "novo" | "contatado" | "interesse" | "fechado" | "perdido";
  responsavel?: string;
}

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClassificacao, setFilterClassificacao] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login");
      return;
    }
    setCurrentUser(JSON.parse(user));

    const storedLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    const leadsWithStatus = storedLeads.map((lead: Lead) => ({
      ...lead,
      status: lead.status || "novo"
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

    if (filterClassificacao) {
      filtered = filtered.filter(lead => lead.classificacao === filterClassificacao);
    }

    if (filterStatus) {
      filtered = filtered.filter(lead => lead.status === filterStatus);
    }

    setFilteredLeads(filtered);
  }, [leads, searchTerm, filterClassificacao, filterStatus]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const updateLeadStatus = (leadId: string, newStatus: string, responsavel?: string) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStatus, responsavel: responsavel || currentUser?.nome }
        : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem("leads", JSON.stringify(updatedLeads));
    
    toast({
      title: "Status atualizado",
      description: "O status do lead foi atualizado com sucesso.",
    });
  };

  const getClassificacaoColor = (classificacao: string) => {
    switch (classificacao) {
      case "quente": return "bg-red-100 text-red-800 border-red-200";
      case "morno": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "frio": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "novo": return "bg-green-100 text-green-800 border-green-200";
      case "contatado": return "bg-blue-100 text-blue-800 border-blue-200";
      case "interesse": return "bg-purple-100 text-purple-800 border-purple-200";
      case "fechado": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "perdido": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
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
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
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
                  <SelectItem value="">Todas</SelectItem>
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
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="novo">Novo</SelectItem>
                  <SelectItem value="contatado">Contatado</SelectItem>
                  <SelectItem value="interesse">Com Interesse</SelectItem>
                  <SelectItem value="fechado">Fechado</SelectItem>
                  <SelectItem value="perdido">Perdido</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Leads Capturados</CardTitle>
            <CardDescription>
              Gerencie e distribua seus leads de plano de saúde
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum lead encontrado com os filtros aplicados.
                </div>
              ) : (
                filteredLeads.map((lead) => (
                  <Card key={lead.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{lead.nome}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {lead.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {lead.telefone}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {lead.cidade}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getClassificacaoColor(lead.classificacao)}>
                          {lead.classificacao.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(lead.status || "novo")}>
                          {(lead.status || "novo").toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <strong>Idade:</strong> {lead.idade} anos
                      </div>
                      <div>
                        <strong>Renda:</strong> R$ {lead.renda}
                      </div>
                      <div>
                        <strong>Tipo de Plano:</strong> {lead.tipoPlano}
                      </div>
                      <div>
                        <strong>Urgência:</strong> {lead.urgencia}
                      </div>
                    </div>

                    {lead.comentarios && (
                      <div className="mb-4 p-3 bg-gray-50 rounded text-sm">
                        <strong>Comentários:</strong> {lead.comentarios}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        Capturado em: {new Date(lead.dataCaptura).toLocaleDateString("pt-BR")}
                        {lead.responsavel && (
                          <span className="ml-4">Responsável: {lead.responsavel}</span>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Select onValueChange={(value) => updateLeadStatus(lead.id, value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Alterar status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="novo">Novo</SelectItem>
                            <SelectItem value="contatado">Contatado</SelectItem>
                            <SelectItem value="interesse">Com Interesse</SelectItem>
                            <SelectItem value="fechado">Fechado</SelectItem>
                            <SelectItem value="perdido">Perdido</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Ligar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
