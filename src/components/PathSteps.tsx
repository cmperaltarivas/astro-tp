interface PathStepItem {
  title: string;
  description: string;
}

interface PathStepsProps {
  items: PathStepItem[];
}

export default function PathSteps({ items }: PathStepsProps) {
  if (!items.length) return null;

  return (
    <ol className="tp-pathsteps-list">
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`} className="tp-pathsteps-item">
          <span className="tp-pathsteps-index">{index + 1}</span>
          <div>
            <h3 className="tp-pathsteps-title">{item.title}</h3>
            <p className="tp-pathsteps-description">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
