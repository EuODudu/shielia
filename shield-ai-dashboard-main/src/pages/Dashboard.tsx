import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  Ban,
  DollarSign,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  dashboardMetrics,
  transactionsOverTime,
  chargebacksByCategory,
  approvalBreakdown,
  recentAlerts,
} from "@/lib/mock-data";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

const metricCards = [
  {
    title: "Valor Protegido",
    value: formatCurrency(dashboardMetrics.protectedValue),
    trend: dashboardMetrics.protectedValueTrend,
    icon: DollarSign,
    accent: "text-primary",
  },
  {
    title: "Taxa de Fraude Evitada",
    value: `${dashboardMetrics.fraudRateAvoided}%`,
    trend: dashboardMetrics.fraudRateTrend,
    icon: ShieldCheck,
    accent: "text-success",
  },
  {
    title: "Transações Analisadas",
    value: formatNumber(dashboardMetrics.transactionsAnalyzed),
    trend: dashboardMetrics.transactionsTrend,
    icon: Activity,
    accent: "text-secondary",
  },
  {
    title: "Chargebacks Prevenidos",
    value: formatNumber(dashboardMetrics.chargebacksPrevented),
    trend: dashboardMetrics.chargebacksTrend,
    icon: Ban,
    accent: "text-warning",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Visão geral da proteção em tempo real</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric) => (
          <Card key={metric.title} className="glass-card hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {metric.title}
                </span>
                <metric.icon className={`h-4 w-4 ${metric.accent}`} />
              </div>
              <div className="text-2xl font-bold tracking-tight">{metric.value}</div>
              <div className="flex items-center gap-1 mt-2">
                {metric.trend > 0 ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={`text-xs font-medium ${metric.trend > 0 ? "text-success" : "text-destructive"}`}>
                  {Math.abs(metric.trend)}%
                </span>
                <span className="text-xs text-muted-foreground">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Line Chart */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Transações ao Longo do Tempo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={transactionsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,30%,18%)" />
                <XAxis dataKey="date" stroke="hsl(215,20%,55%)" fontSize={12} />
                <YAxis stroke="hsl(215,20%,55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222,47%,11%)",
                    border: "1px solid hsl(220,30%,18%)",
                    borderRadius: "8px",
                    color: "hsl(210,40%,92%)",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="approved" stroke="hsl(187,94%,43%)" strokeWidth={2} dot={false} name="Aprovadas" />
                <Line type="monotone" dataKey="blocked" stroke="hsl(0,84%,60%)" strokeWidth={2} dot={false} name="Bloqueadas" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Distribuição</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={approvalBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {approvalBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222,47%,11%)",
                    border: "1px solid hsl(220,30%,18%)",
                    borderRadius: "8px",
                    color: "hsl(210,40%,92%)",
                  }}
                  formatter={(value: number) => [`${value}%`, ""]}
                />
                <Legend
                  formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Chargebacks por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chargebacksByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,30%,18%)" />
                <XAxis dataKey="category" stroke="hsl(215,20%,55%)" fontSize={11} />
                <YAxis stroke="hsl(215,20%,55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222,47%,11%)",
                    border: "1px solid hsl(220,30%,18%)",
                    borderRadius: "8px",
                    color: "hsl(210,40%,92%)",
                  }}
                />
                <Bar dataKey="count" fill="hsl(258,90%,66%)" radius={[4, 4, 0, 0]} name="Quantidade" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Alertas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                    alert.level === "high"
                      ? "bg-destructive"
                      : alert.level === "medium"
                      ? "bg-warning"
                      : "bg-success"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-relaxed">{alert.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
