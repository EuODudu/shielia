export const dashboardMetrics = {
  protectedValue: 2847563.42,
  fraudRateAvoided: 98.7,
  transactionsAnalyzed: 184729,
  chargebacksPrevented: 1243,
  protectedValueTrend: 12.5,
  fraudRateTrend: 0.3,
  transactionsTrend: 8.2,
  chargebacksTrend: -15.4,
};

export const transactionsOverTime = [
  { date: "Jan", total: 12400, blocked: 320, approved: 12080 },
  { date: "Fev", total: 13800, blocked: 280, approved: 13520 },
  { date: "Mar", total: 15200, blocked: 410, approved: 14790 },
  { date: "Abr", total: 14100, blocked: 350, approved: 13750 },
  { date: "Mai", total: 16800, blocked: 290, approved: 16510 },
  { date: "Jun", total: 18400, blocked: 380, approved: 18020 },
  { date: "Jul", total: 17200, blocked: 310, approved: 16890 },
];

export const chargebacksByCategory = [
  { category: "Fraude", count: 142, value: 89400 },
  { category: "Não reconhecido", count: 98, value: 45200 },
  { category: "Produto", count: 67, value: 23100 },
  { category: "Duplicado", count: 34, value: 12800 },
  { category: "Outros", count: 21, value: 8900 },
];

export const approvalBreakdown = [
  { name: "Aprovado", value: 82, fill: "hsl(160, 84%, 39%)" },
  { name: "Bloqueado", value: 8, fill: "hsl(0, 84%, 60%)" },
  { name: "Em análise", value: 10, fill: "hsl(38, 92%, 50%)" },
];

export const recentAlerts = [
  { id: 1, message: "Tentativa de fraude bloqueada - R$ 4.250,00", level: "high" as const, time: "2 min atrás" },
  { id: 2, message: "Padrão suspeito detectado - 3 transações similares", level: "medium" as const, time: "15 min atrás" },
  { id: 3, message: "Score de risco elevado - Novo dispositivo", level: "medium" as const, time: "32 min atrás" },
  { id: 4, message: "Chargeback prevenido com sucesso", level: "low" as const, time: "1h atrás" },
  { id: 5, message: "Transação de alto valor aprovada após verificação", level: "low" as const, time: "2h atrás" },
];

export type Transaction = {
  id: string;
  amount: number;
  riskScore: number;
  status: "approved" | "blocked" | "review";
  date: string;
  customer: string;
  method: string;
};

export const transactions: Transaction[] = [
  { id: "TXN-001847", amount: 1250.0, riskScore: 12, status: "approved", date: "2024-03-15 14:32", customer: "João Silva", method: "Cartão de Crédito" },
  { id: "TXN-001848", amount: 4890.5, riskScore: 87, status: "blocked", date: "2024-03-15 14:28", customer: "Maria Santos", method: "Cartão de Crédito" },
  { id: "TXN-001849", amount: 320.0, riskScore: 45, status: "review", date: "2024-03-15 14:15", customer: "Pedro Costa", method: "PIX" },
  { id: "TXN-001850", amount: 780.0, riskScore: 8, status: "approved", date: "2024-03-15 13:58", customer: "Ana Oliveira", method: "Débito" },
  { id: "TXN-001851", amount: 2100.0, riskScore: 72, status: "blocked", date: "2024-03-15 13:42", customer: "Carlos Mendes", method: "Cartão de Crédito" },
  { id: "TXN-001852", amount: 150.0, riskScore: 5, status: "approved", date: "2024-03-15 13:30", customer: "Lucia Ferreira", method: "PIX" },
  { id: "TXN-001853", amount: 3400.0, riskScore: 63, status: "review", date: "2024-03-15 13:18", customer: "Roberto Alves", method: "Cartão de Crédito" },
  { id: "TXN-001854", amount: 890.0, riskScore: 15, status: "approved", date: "2024-03-15 13:05", customer: "Fernanda Lima", method: "Débito" },
  { id: "TXN-001855", amount: 5600.0, riskScore: 91, status: "blocked", date: "2024-03-15 12:48", customer: "Marcos Souza", method: "Cartão de Crédito" },
  { id: "TXN-001856", amount: 420.0, riskScore: 22, status: "approved", date: "2024-03-15 12:30", customer: "Juliana Rocha", method: "PIX" },
];

export type Dispute = {
  id: string;
  transactionId: string;
  amount: number;
  status: "won" | "lost" | "in_progress";
  date: string;
  reason: string;
};

export const disputes: Dispute[] = [
  { id: "DSP-0042", transactionId: "TXN-001720", amount: 2340.0, status: "won", date: "2024-03-10", reason: "Fraude comprovada" },
  { id: "DSP-0043", transactionId: "TXN-001735", amount: 890.0, status: "in_progress", date: "2024-03-12", reason: "Compra não reconhecida" },
  { id: "DSP-0044", transactionId: "TXN-001748", amount: 1560.0, status: "lost", date: "2024-03-08", reason: "Produto não entregue" },
  { id: "DSP-0045", transactionId: "TXN-001762", amount: 4200.0, status: "in_progress", date: "2024-03-14", reason: "Transação duplicada" },
  { id: "DSP-0046", transactionId: "TXN-001780", amount: 670.0, status: "won", date: "2024-03-09", reason: "Fraude comprovada" },
  { id: "DSP-0047", transactionId: "TXN-001795", amount: 3100.0, status: "won", date: "2024-03-11", reason: "Compra não reconhecida" },
];

export const riskFactors = [
  { factor: "Localização", weight: 85, description: "IP de região com alto índice de fraude" },
  { factor: "Dispositivo", weight: 72, description: "Novo dispositivo não reconhecido" },
  { factor: "Comportamento", weight: 68, description: "Padrão de compra incomum" },
  { factor: "Velocidade", weight: 45, description: "Múltiplas transações em curto período" },
  { factor: "Valor", weight: 55, description: "Valor acima da média do cliente" },
  { factor: "Histórico", weight: 20, description: "Cliente com bom histórico" },
];

export const riskRadarData = [
  { subject: "Localização", A: 85, fullMark: 100 },
  { subject: "Dispositivo", A: 72, fullMark: 100 },
  { subject: "Comportamento", A: 68, fullMark: 100 },
  { subject: "Velocidade", A: 45, fullMark: 100 },
  { subject: "Valor", A: 55, fullMark: 100 },
  { subject: "Histórico", A: 20, fullMark: 100 },
];

export const riskDistribution = [
  { range: "0-20", count: 8420 },
  { range: "21-40", count: 3210 },
  { range: "41-60", count: 1450 },
  { range: "61-80", count: 620 },
  { range: "81-100", count: 180 },
];

export const aiInsights = [
  { id: 1, title: "Padrão de comportamento incomum", description: "3 transações de alto valor em dispositivos diferentes nas últimas 2 horas", severity: "high" as const, icon: "brain" as const },
  { id: 2, title: "Novo fingerprint de dispositivo", description: "Dispositivo nunca utilizado anteriormente nesta conta", severity: "medium" as const, icon: "fingerprint" as const },
  { id: 3, title: "Geolocalização suspeita", description: "Transação originada de região com alto índice de fraude", severity: "high" as const, icon: "map" as const },
  { id: 4, title: "Velocidade de transações", description: "Intervalo entre compras abaixo do padrão normal", severity: "medium" as const, icon: "zap" as const },
];

export const reportMetrics = {
  moneyRecovered: 456780.0,
  moneyProtected: 2847563.42,
  successRate: 94.2,
  totalDisputes: 342,
  disputesWon: 298,
};

export const monthlyPerformance = [
  { month: "Jan", recovered: 42000, protected: 320000, disputes: 28 },
  { month: "Fev", recovered: 38000, protected: 380000, disputes: 32 },
  { month: "Mar", recovered: 52000, protected: 410000, disputes: 26 },
  { month: "Abr", recovered: 45000, protected: 350000, disputes: 30 },
  { month: "Mai", recovered: 61000, protected: 480000, disputes: 22 },
  { month: "Jun", recovered: 58000, protected: 520000, disputes: 24 },
];
