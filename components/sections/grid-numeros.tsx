interface GridNumerosProps {
  titulo?: string;
  items: Array<{
    numero: string;
    sufixo?: string;
    descricao: string;
    destaque?: boolean;
  }>;
}

export default function GridNumerosSection({ titulo, items }: GridNumerosProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-16 bg-muted">
      <div className="container">
        {titulo && (
          <h2 className="text-3xl font-bold text-center mb-12">{titulo}</h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className={`text-center ${item.destaque ? 'md:col-span-2' : ''}`}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {item.numero}
                {item.sufixo && (
                  <span className="text-2xl ml-1">{item.sufixo}</span>
                )}
              </div>
              <p className="text-muted-foreground">{item.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
