
import { useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone, 
  Mail, 
  Eye,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeadDetailsModal } from "./LeadDetailsModal";

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

interface LeadsTableProps {
  leads: Lead[];
  onUpdateStatus: (leadId: string, newStatus: Lead["status"], responsavel?: string) => void;
  currentUser: any;
}

export const LeadsTable = ({ leads, onUpdateStatus, currentUser }: LeadsTableProps) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCall = (telefone: string) => {
    window.open(`tel:${telefone}`, '_self');
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  if (leads.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum lead encontrado com os filtros aplicados.
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Classificação</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
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
                <TableCell>{lead.cidade}</TableCell>
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
                  <Select 
                    value={lead.status || "novo"} 
                    onValueChange={(value) => onUpdateStatus(lead.id, value as Lead["status"])}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="novo">Novo</SelectItem>
                      <SelectItem value="contatado">Contatado</SelectItem>
                      <SelectItem value="interesse">Interesse</SelectItem>
                      <SelectItem value="fechado">Fechado</SelectItem>
                      <SelectItem value="perdido">Perdido</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(lead.dataCaptura).toLocaleDateString("pt-BR")}
                  </div>
                  {lead.responsavel && (
                    <div className="text-xs text-gray-500">{lead.responsavel}</div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(lead)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleCall(lead.telefone)}>
                          <Phone className="h-4 w-4 mr-2" />
                          Ligar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEmail(lead.email)}>
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <LeadDetailsModal
        lead={selectedLead}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={onUpdateStatus}
        currentUser={currentUser}
      />
    </>
  );
};
