/** Qiymət göstəricisi — bütün panellərdə eyni format */
export function formatAzn(n: number): string {
  return (
    n.toLocaleString("az-AZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " ₼"
  );
}
