
import { MapPin, Building2, Headphones } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-5xl">
        <h1 className="text-6xl font-bold mb-6 text-slate-800">
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
          <div className="group relative overflow-hidden rounded-2xl bg-blue-600 p-8 text-white transform hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cobertura Nacional</h3>
              <p className="text-blue-100">Atendimento em todo território brasileiro com rede credenciada</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-orange-600 p-8 text-white transform hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">+50 Operadoras</h3>
              <p className="text-orange-100">Parceria com as principais operadoras do mercado nacional</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-green-600 p-8 text-white transform hover:scale-105 transition-all duration-300">
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
  );
};
