export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container py-5">
      {children}
    </main>
  );
}
