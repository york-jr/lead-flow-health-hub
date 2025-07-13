
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, Shield, Users, Star, Phone, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    idade: "",
    bairro: "",
    cidade: "",
    tipoPlano: "",
    coParticipacao: "",
    urgencia: "",
    comentarios: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const qualificarLead = () => {
    let pontuacao = 0;
    
    // Idade (mais jovem = mais pontos)
    const idade = parseInt(formData.idade);
    if (idade < 30) pontuacao += 3;
    else if (idade < 45) pontuacao += 2;
    else pontuacao += 1;

    // Tipo de plano
    if (formData.tipoPlano === "individual") pontuacao += 3;
    else if (formData.tipoPlano === "pessoa-juridica") pontuacao += 2;
    else pontuacao += 1;

    // Co-participação (sem co-participação = mais pontos)
    if (formData.coParticipacao === "sem") pontuacao += 2;
    else pontuacao += 1;

    // Urgência
    if (formData.urgencia === "imediata") pontuacao += 3;
    else if (formData.urgencia === "1mes") pontuacao += 2;
    else pontuacao += 1;

    if (pontuacao >= 10) return "quente";
    else if (pontuacao >= 7) return "morno";
    else return "frio";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const classificacao = qualificarLead();
      const leadData = {
        ...formData,
        classificacao,
        dataCaptura: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
      };

      // Simular salvamento (aqui você integraria com Supabase)
      const existingLeads = JSON.parse(localStorage.getItem("leads") || "[]");
      existingLeads.push(leadData);
      localStorage.setItem("leads", JSON.stringify(existingLeads));

      toast({
        title: "Lead capturado com sucesso!",
        description: `Classificação: ${classificacao.toUpperCase()}. Em breve entraremos em contato.`,
      });

      setFormData({
        nome: "",
        email: "",
        telefone: "",
        idade: "",
        bairro: "",
        cidade: "",
        tipoPlano: "",
        coParticipacao: "",
        urgencia: "",
        comentarios: ""
      });
    } catch (error) {
      toast({
        title: "Erro ao capturar lead",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <Button onClick={() => navigate("/login")} variant="outline">
            Área do Cliente
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Encontre o Plano de Saúde Ideal para Você
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Compare preços, cobertura e encontre o melhor plano de saúde em menos de 2 minutos
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Heart className="h-6 w-6" />
              <span className="font-semibold">Cobertura Nacional</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Users className="h-6 w-6" />
              <span className="font-semibold">+50 Operadoras</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-600">
              <Star className="h-6 w-6" />
              <span className="font-semibold">Atendimento 5⭐</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800">
                Receba sua Cotação Gratuita
              </CardTitle>
              <CardDescription className="text-lg">
                Preencha os dados abaixo e receba propostas personalizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="idade">Idade *</Label>
                    <Input
                      id="idade"
                      type="number"
                      value={formData.idade}
                      onChange={(e) => handleInputChange("idade", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      required
                      className="mt-1"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bairro">Bairro *</Label>
                    <Input
                      id="bairro"
                      value={formData.bairro}
                      onChange={(e) => handleInputChange("bairro", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Input
                      id="cidade"
                      value={formData.cidade}
                      onChange={(e) => handleInputChange("cidade", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tipoPlano">Tipo de Plano Desejado *</Label>
                    <Select onValueChange={(value) => handleInputChange("tipoPlano", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="pessoa-juridica">Pessoa Jurídica</SelectItem>
                        <SelectItem value="adesao">Adesão</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="coParticipacao">Co-participação *</Label>
                    <Select onValueChange={(value) => handleInputChange("coParticipacao", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="com">Com Co-participação</SelectItem>
                        <SelectItem value="sem">Sem Co-participação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="urgencia">Quando precisa contratar? *</Label>
                  <Select onValueChange={(value) => handleInputChange("urgencia", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o prazo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imediata">Imediatamente</SelectItem>
                      <SelectItem value="1mes">Em até 1 mês</SelectItem>
                      <SelectItem value="3meses">Em até 3 meses</SelectItem>
                      <SelectItem value="futuro">No futuro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="comentarios">Comentários Adicionais</Label>
                  <Textarea
                    id="comentarios"
                    value={formData.comentarios}
                    onChange={(e) => handleInputChange("comentarios", e.target.value)}
                    className="mt-1"
                    placeholder="Alguma necessidade específica ou dúvida?"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 text-lg font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Processando..." : "Receber Cotação Gratuita"}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  Seus dados estão seguros conosco. Não compartilhamos com terceiros.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-12">Por que escolher nosso serviço?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Phone className="h-12 w-12 mx-auto" />
              <h3 className="text-xl font-semibold">Atendimento Personalizado</h3>
              <p>Consultores especializados para ajudar na sua escolha</p>
            </div>
            <div className="space-y-4">
              <Mail className="h-12 w-12 mx-auto" />
              <h3 className="text-xl font-semibold">Resposta Rápida</h3>
              <p>Cotações em até 24 horas direto no seu e-mail</p>
            </div>
            <div className="space-y-4">
              <MapPin className="h-12 w-12 mx-auto" />
              <h3 className="text-xl font-semibold">Cobertura Nacional</h3>
              <p>Planos disponíveis em todo o território brasileiro</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6" />
            <span className="text-lg font-bold">HealthLead Pro</span>
          </div>
          <p className="text-gray-400">
            © 2024 HealthLead Pro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
