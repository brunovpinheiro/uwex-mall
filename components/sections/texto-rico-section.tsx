interface TextoRicoSectionProps {
  conteudo: string | any;
}

export default function TextoRicoSection({ conteudo }: TextoRicoSectionProps) {
  if (!conteudo) return null;

  return (
    <section className="py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {typeof conteudo === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: conteudo }} />
          ) : (
            <div>{JSON.stringify(conteudo)}</div>
          )}
        </div>
      </div>
    </section>
  );
}
