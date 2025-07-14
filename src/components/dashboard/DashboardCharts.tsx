
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp } from "lucide-react";

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  idade: string;
  bairro: string;
  cidade: string;
  tipoPlano: string;
  urgencia: string;
  comentarios: string;
  classificacao: "quente" | "morno" | "frio";
  dataCaptura: string;
  status?: "novo" | "contatado" | "interesse" | "fechado" | "perdido";
  responsavel?: string;
}

interface DashboardChartsProps {
  leads: Lead[];
}

const chartConfig = {
  quente: {
    label: "Quente",
    color: "hsl(var(--destructive))",
  },
  morno: {
    label: "Morno", 
    color: "hsl(var(--warning))",
  },
  frio: {
    label: "Frio",
    color: "hsl(var(--primary))",
  },
  novo: {
    label: "Novo",
    color: "hsl(var(--success))",
  },
  contatado: {
    label: "Contatado",
    color: "hsl(var(--primary))",
  },
  interesse: {
    label: "Interesse",
    color: "hsl(var(--secondary))",
  },
  fechado: {
    label: "Fechado",
    color: "hsl(var(--success))",
  },
  perdido: {
    label: "Perdido",
    color: "hsl(var(--muted-foreground))",
  },
};

export const DashboardCharts = ({ leads }: DashboardChartsProps) => {
  // Dados para gráfico de classificação
  const classificacaoData = [
    {
      name: "Quente",
      value: leads.filter(l => l.classificacao === "quente").length,
      fill: "hsl(var(--destructive))",
    },
    {
      name: "Morno", 
      value: leads.filter(l => l.classificacao === "morno").length,
      fill: "hsl(var(--warning))",
    },
    {
      name: "Frio",
      value: leads.filter(l => l.classificacao === "frio").length,
      fill: "hsl(var(--primary))",
    },
  ];

  // Dados para gráfico de status
  const statusData = [
    { status: "Novo", quantidade: leads.filter(l => l.status === "novo").length },
    { status: "Contatado", quantidade: leads.filter(l => l.status === "contatado").length },
    { status: "Interesse", quantidade: leads.filter(l => l.status === "interesse").length },
    { status: "Fechado", quantidade: leads.filter(l => l.status === "fechado").length },
    { status: "Perdido", quantidade: leads.filter(l => l.status === "perdido").length },
  ];

  // Dados para gráfico de leads por cidade (top 5)
  const cidadeCount = leads.reduce((acc, lead) => {
    acc[lead.cidade] = (acc[lead.cidade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cidadeData = Object.entries(cidadeCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([cidade, quantidade]) => ({ cidade, quantidade }));

  // Dados para gráfico de leads por tempo (últimos 7 dias)
  const getLeadsByDate = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = leads.filter(lead => 
        lead.dataCaptura.split('T')[0] === dateStr
      ).length;
      
      last7Days.push({
        data: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        quantidade: count
      });
    }
    return last7Days;
  };

  const tempoData = getLeadsByDate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Gráfico de Pizza - Classificação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Leads por Classificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={classificacaoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {classificacaoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Barras - Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status dos Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <XAxis dataKey="status" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="quantidade" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Barras - Top Cidades */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Cidades</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cidadeData} layout="horizontal">
                <XAxis type="number" />
                <YAxis dataKey="cidade" type="category" width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="quantidade" fill="hsl(var(--success))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Linha - Leads por Tempo */}
      <Card>
        <CardHeader>
          <CardTitle>Leads nos Últimos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tempoData}>
                <XAxis dataKey="data" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="quantidade" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
