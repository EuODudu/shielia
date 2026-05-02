import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, DollarSign, TrendingUp, Award } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { reportMetrics, monthlyPerformance } from "@/lib/mock-data";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export default function Reports() {
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground text-sm mt-1">Análise de performance e ROI</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> CSV
          </Button>
          <Button className="gap-2 glow-cyan">
            <Download className="h-4 w-4" /> PDF
          </Button>
        </div>
      </div>

      {/* ROI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Dinheiro Recuperado", value: formatCurrency(reportMetrics.moneyRecovered), icon: DollarSign, color: "text-success" },
          { label: "Valor Protegido", value: formatCurrency(reportMetrics.moneyProtected), icon: TrendingUp, color: "text-primary" },
          { label: "Taxa de Sucesso", value: `${reportMetrics.successRate}%`, icon: Award, color: "text-secondary" },
        ].map((m) => (
          <Card key={m.label} className="glass-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{m.label}</span>
                <m.icon className={`h-4 w-4 ${m.color}`} />
              </div>
              <p className="text-2xl font-bold">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Performance Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,30%,18%)" />
              <XAxis dataKey="month" stroke="hsl(215,20%,55%)" fontSize={12} />
              <YAxis stroke="hsl(215,20%,55%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222,47%,11%)",
                  border: "1px solid hsl(220,30%,18%)",
                  borderRadius: "8px",
                  color: "hsl(210,40%,92%)",
                }}
                formatter={(value: number) => [formatCurrency(value), ""]}
              />
              <Legend />
              <Line type="monotone" dataKey="recovered" stroke="hsl(160,84%,39%)" strokeWidth={2} dot={false} name="Recuperado" />
              <Line type="monotone" dataKey="protected" stroke="hsl(187,94%,43%)" strokeWidth={2} dot={false} name="Protegido" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Table */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Detalhamento Mensal</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Mês</TableHead>
                <TableHead className="text-muted-foreground">Recuperado</TableHead>
                <TableHead className="text-muted-foreground">Protegido</TableHead>
                <TableHead className="text-muted-foreground">Disputas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyPerformance.map((m) => (
                <TableRow key={m.month} className="border-border hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{m.month}</TableCell>
                  <TableCell className="text-success">{formatCurrency(m.recovered)}</TableCell>
                  <TableCell className="text-primary">{formatCurrency(m.protected)}</TableCell>
                  <TableCell>{m.disputes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
