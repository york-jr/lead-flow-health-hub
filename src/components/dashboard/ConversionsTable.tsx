
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  Calendar,
  ClipboardList
} from "lucide-react";
import { Lead } from "@/types/lead";

interface ConversionsTableProps {
  currentUser: any;
}

export const ConversionsTable = ({ currentUser }: ConversionsTableProps) => {
  const [conversions, setConversions] = useState<Lead[]>([]);

  // Carregar conversões do usuário atual
  useEffect(() => {
    if (currentUser?.id) {
      const userHistory = JSON.parse(localStorage.getItem(`lead_history_${currentUser.id}`) || "[]");
      const userConversions = userHistory.filter((lead: Lead) => lead.status === "fechado");
      setConversions(userConversions);
    }
  }, [currentUser]);

  const getClassificacaoColor = (classificacao: string) => {
    switch (classificacao) {
      case "quente": return "bg-red-100 text-red-800 border-red-200";
      case "morno": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "frio": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleCall = (telefone: string) => {
    window.open(`tel:${telefone}`, '_self');
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleReview = (lead: Lead) => {
    // Por enquanto apenas mostra um console.log
    console.log("Revisando lead:", lead);
  };

  if (conversions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhuma conversão encontrada no seu histórico.
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Plano</TableHead>
            <TableHead>Classificação</TableHead>
            <TableHead>Data da Venda</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conversions.map((lead) => (
            <TableRow key={lead.id} className="hover:bg-gray-50">
              <TableCell>
                <div>
                  <div className="font-medium">{lead.nome}</div>
                  <div className="text-sm text-gray-500">{lead.idade} anos</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Phone className="h-3 w-3" />
                    {lead.telefone}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Mail className="h-3 w-3" />
                    {lead.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="text-sm">{lead.tipoPlano}</div>
                  <div className="text-xs text-gray-500">{lead.urgencia}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getClassificacaoColor(lead.classificacao)} variant="outline">
                  {lead.classificacao.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-gray-500" />
                  <span className="text-sm">
                    {new Date(lead.dataStatusChange || lead.dataCaptura).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCall(lead.telefone)}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEmail(lead.email)}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReview(lead)}
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <ClipboardList className="h-4 w-4 mr-1" />
                    Revisar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
