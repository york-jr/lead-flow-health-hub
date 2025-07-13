
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, Shield, Users, Star, Phone, Mail, MapPin, Building2, Headphones } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-orange-500 to-green-600 bg-clip-text text-transparent">
              HealthLead Pro
            </span>
          </div>
          <Button onClick={() => navigate("/login")} variant="outline" className="border-orange-200 hover:bg-orange-50">
            Área do Cliente
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-orange-500 to-green-600 bg-clip-text text-transparent">
            Encontre o Plano de Saúde Ideal para Você e Sua Família
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Descubra o plano de saúde perfeito que se adapta ao seu perfil, orçamento e necessidades específicas. 
            Nossa plataforma inteligente analisa mais de 200 opções de planos das principais operadoras do Brasil, 
            comparando preços, cobertura, rede credenciada e benefícios exclusivos para encontrar exatamente o que você precisa.
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
            Com tecnologia avançada de matching e consultores especialistas, garantimos que você tome a decisão mais acertada 
            para proteger sua saúde e de quem você ama, sem pagar mais por isso.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white transform hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cobertura Nacional</h3>
                <p className="text-blue-100">Atendimento em todo território brasileiro com rede credenciada</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white transform hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <Building2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">+50 Operadoras</h3>
                <p className="text-orange-100">Parceria com as principais operadoras do mercado nacional</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-8 text-white transform hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <Headphones className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Atendimento 5⭐</h3>
                <p className="text-green-100">Suporte especializado e atendimento personalizado</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">500K+</div>
              <div className="text-gray-600">Clientes Atendidos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-1">98%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">24h</div>
              <div className="text-gray-600">Resposta Rápida</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">15+</div>
              <div className="text-gray-600">Anos no Mercado</div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center bg-gradient-to-r from-blue-600 via-orange-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold">
                Receba sua Cotação Gratuita
              </CardTitle>
              <CardDescription className="text-lg text-white/90">
                Preencha os dados abaixo e receba propostas personalizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
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
                  className="w-full bg-gradient-to-r from-blue-600 via-orange-500 to-green-600 hover:from-blue-700 hover:via-orange-600 hover:to-green-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Processando..." : "🚀 Receber Cotação Gratuita"}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  🔒 Seus dados estão seguros conosco. Não compartilhamos com terceiros.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 via-orange-500 to-green-600">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Por que escolher nosso serviço?</h2>
          <p className="text-xl mb-12 text-white/90">Mais de 15 anos conectando pessoas aos melhores planos de saúde</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <Phone className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Atendimento Personalizado</h3>
              <p className="text-lg text-white/90">Consultores especializados para ajudar na sua escolha ideal</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <Mail className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Resposta Rápida</h3>
              <p className="text-lg text-white/90">Cotações em até 24 horas direto no seu e-mail</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <Star className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Melhores Preços</h3>
              <p className="text-lg text-white/90">Negociamos os melhores valores do mercado para você</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 via-orange-500 to-green-600 bg-clip-text text-transparent">
            O que nossos clientes falam
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">"Excelente atendimento! Encontrei o plano perfeito para minha família."</p>
              <p className="font-semibold text-gray-800">- Maria Silva</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">"Processo super rápido e transparente. Recomendo!"</p>
              <p className="font-semibold text-gray-800">- João Santos</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">"Economizei muito com a ajuda da equipe. Muito obrigada!"</p>
              <p className="font-semibold text-gray-800">- Ana Costa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-orange-400" />
                <span className="text-lg font-bold">HealthLead Pro</span>
              </div>
              <p className="text-gray-400">
                Conectando você aos melhores planos de saúde do Brasil.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Serviços</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Planos Individuais</li>
                <li>Planos Empresariais</li>
                <li>Planos por Adesão</li>
                <li>Consultoria Gratuita</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Contato</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(11) 4000-0000</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contato@healthlead.com.br</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Horários</h3>
              <p className="text-gray-400">
                Segunda à Sexta: 8h às 18h<br />
                Sábado: 8h às 12h<br />
                Domingo: Fechado
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 HealthLead Pro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
