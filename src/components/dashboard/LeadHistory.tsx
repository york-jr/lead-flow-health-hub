import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  UserCheck
} from "lucide-react";
import { Lead } from "@/types/lead";

interface LeadHistoryProps {
  currentUser: any;
}

export const LeadHistory = ({ currentUser }: LeadHistoryProps) => {
  const [userHistory, setUserHistory] = useState<Lead[]>([]);

  // Carregar histórico do usuário atual
  useState(() => {
    const history = JSON.parse(localStorage.getItem(`lead_history_${currentUser?.id}`) || "[]");
    setUserHistory(history);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "contatado": return "bg-blue-100 text-blue-800 border-blue-200";
      case "interesse": return "bg-purple-100 text-purple-800 border-purple-200";
      case "fechado": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getClassificacaoColor = (classificacao: string) => {
    switch (classificacao) {
      case "quente": return "bg-red-100 text-red-800 border-red-200";
      case "morno": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "frio": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (userHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Meu Histórico de Leads
            <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
              <UserCheck className="h-3 w-3 mr-1" />
              Pessoal
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <UserCheck className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Nenhum lead no seu histórico pessoal ainda.</p>
            <p className="text-sm mt-1">Leads marcados como "contatado", "interesse" ou "fechado" aparecerão aqui.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Meu Histórico de Leads ({userHistory.length})
          </CardTitle>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <UserCheck className="h-3 w-3 mr-1" />
            {currentUser?.nome}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userHistory.map((lead) => (
            <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 relative">
              {/* Identificação do responsável */}
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                  <UserCheck className="h-2 w-2 mr-1" />
                  Meu Lead
                </Badge>
              </div>

              <div className="flex justify-between items-start mb-3 pr-20">
                <div>
                  <h3 className="font-medium text-lg">{lead.nome}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="h-3 w-3" />
                    {lead.idade} anos
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getClassificacaoColor(lead.classificacao)} variant="outline">
                    {lead.classificacao.toUpperCase()}
                  </Badge>
                  <Badge className={getStatusColor(lead.status || "novo")} variant="outline">
                    {(lead.status || "novo").toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-gray-400" />
                    {lead.telefone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-gray-400" />
                    {lead.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    {lead.cidade} - {lead.bairro || 'Bairro não informado'}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Plano:</span> {lead.tipoPlano}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Urgência:</span> {lead.urgencia}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Responsável:</span> 
                    <Badge variant="outline" className="ml-1 bg-blue-50 text-blue-700 border-blue-200 text-xs">
                      {lead.responsavel || currentUser?.nome}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Capturado: {new Date(lead.dataCaptura).toLocaleDateString("pt-BR")}
                </div>
                {lead.dataStatusChange && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Atualizado: {new Date(lead.dataStatusChange).toLocaleDateString("pt-BR")}
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`tel:${lead.telefone}`, '_self')}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Ligar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
