
import { Shield, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
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
  );
};
