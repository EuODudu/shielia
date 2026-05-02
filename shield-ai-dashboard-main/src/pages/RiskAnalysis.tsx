import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, MapPin, Fingerprint, Zap, AlertTriangle } from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { riskRadarData, riskDistribution, riskFactors, aiInsights } from "@/lib/mock-data";

const iconMap = {
  brain: Brain,
  fingerprint: Fingerprint,
  map: MapPin,
  zap: Zap,
};

export default function RiskAnalysis() {
  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Análise de Risco com IA</h1>
        <p className="text-muted-foreground text-sm mt-1">Insights inteligentes sobre padrões de risco</p>
      </div>

      {/* Top row: Radar + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Brain className="h-4 w-4 text-secondary" />
              Score de Risco - Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={riskRadarData}>
                <PolarGrid stroke="hsl(220,30%,18%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215,20%,55%)", fontSize: 11 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar
                  name="Risco"
                  dataKey="A"
                  stroke="hsl(187,94%,43%)"
                  fill="hsl(187,94%,43%)"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Insights da IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiInsights.map((insight) => {
              const Icon = iconMap[insight.icon];
              return (
                <div
                  key={insight.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-all"
                >
                  <div className={`p-2 rounded-lg shrink-0 ${
                    insight.severity === "high" ? "bg-destructive/10" : "bg-warning/10"
                  }`}>
                    <Icon className={`h-4 w-4 ${
                      insight.severity === "high" ? "text-destructive" : "text-warning"
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{insight.title}</p>
                      <Badge variant="outline" className={
                        insight.severity === "high"
                          ? "bg-destructive/10 text-destructive border-destructive/20 text-[10px]"
                          : "bg-warning/10 text-warning border-warning/20 text-[10px]"
                      }>
                        {insight.severity === "high" ? "Alto" : "Médio"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Risk Factors */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fatores de Risco</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskFactors.map((f) => (
              <div key={f.factor} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{f.factor}</span>
                  <span className={`text-xs font-mono font-bold ${
                    f.weight >= 70 ? "text-destructive" : f.weight >= 40 ? "text-warning" : "text-success"
                  }`}>{f.weight}%</span>
                </div>
                <Progress value={f.weight} className="h-1.5" />
                <p className="text-[11px] text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Distribution */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Distribuição de Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,30%,18%)" />
                <XAxis dataKey="range" stroke="hsl(215,20%,55%)" fontSize={12} />
                <YAxis stroke="hsl(215,20%,55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222,47%,11%)",
                    border: "1px solid hsl(220,30%,18%)",
                    borderRadius: "8px",
                    color: "hsl(210,40%,92%)",
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Transações">
                  {riskDistribution.map((entry, i) => (
                    <Bar
                      key={i}
                      dataKey="count"
                      fill={
                        i >= 3 ? "hsl(0,84%,60%)" : i >= 2 ? "hsl(38,92%,50%)" : "hsl(160,84%,39%)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
