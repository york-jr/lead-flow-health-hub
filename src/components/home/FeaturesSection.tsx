
import { Phone, Mail, Star } from "lucide-react";

export const FeaturesSection = () => {
  return (
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
  );
};
