
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  return (
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
  );
};
