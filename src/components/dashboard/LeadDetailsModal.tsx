import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  DollarSign,
  User,
  MessageSquare,
  Clock
} from "lucide-react";
import { Lead } from "@/types/lead";

interface LeadDetailsModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (leadId: string, newStatus: Lead["status"], responsavel?: string) => void;
  currentUser: any;
}

export const LeadDetailsModal = ({ 
  lead, 
  isOpen, 
  onClose, 
  onUpdateStatus, 
  currentUser 
}: LeadDetailsModalProps) => {
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  if (!lead) return null;

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

  const handleStatusUpdate = (newStatus: Lead["status"]) => {
    onUpdateStatus(lead.id, newStatus, currentUser?.nome);
  };

  const handleCallLead = () => {
    window.open(`tel:${lead.telefone}`, '_self');
    toast({
      title: "Ligação iniciada",
      description: `Ligando para ${lead.nome}...`,
    });
  };

  const handleEmailLead = () => {
    window.open(`mailto:${lead.email}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {lead.nome}
          </DialogTitle>
          <DialogDescription>
            Detalhes completos do lead capturado em {new Date(lead.dataCaptura).toLocaleDateString("pt-BR")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{lead.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{lead.telefone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{lead.cidade}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{lead.idade} anos</span>
              </div>
              {lead.renda && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span>R$ {lead.renda}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informações do Plano */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interesse em Plano</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="font-medium">Tipo de Plano:</span>
                <p className="text-gray-600">{lead.tipoPlano}</p>
              </div>
              <div>
                <span className="font-medium">Urgência:</span>
                <p className="text-gray-600">{lead.urgencia}</p>
              </div>
              <div className="flex gap-2">
                <Badge className={getClassificacaoColor(lead.classificacao)}>
                  {lead.classificacao.toUpperCase()}
                </Badge>
                <Badge className={getStatusColor(lead.status || "novo")}>
                  {(lead.status || "novo").toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comentários */}
        {lead.comentarios && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Comentários do Lead
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{lead.comentarios}</p>
            </CardContent>
          </Card>
        )}

        {/* Ações */}
        <div className="border-t pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Alterar Status</label>
              <Select onValueChange={(value) => handleStatusUpdate(value as Lead["status"])}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar novo status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="novo">Novo</SelectItem>
                  <SelectItem value="contatado">Contatado</SelectItem>
                  <SelectItem value="interesse">Com Interesse</SelectItem>
                  <SelectItem value="fechado">Fechado</SelectItem>
                  <SelectItem value="perdido">Perdido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleCallLead} className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Ligar
              </Button>
              <Button onClick={handleEmailLead} variant="outline" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Adicionar Observações</label>
            <Textarea
              placeholder="Digite suas observações sobre este lead..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
            <Button className="mt-2" size="sm">
              Salvar Observações
            </Button>
          </div>

          {lead.responsavel && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              Responsável: {lead.responsavel}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
