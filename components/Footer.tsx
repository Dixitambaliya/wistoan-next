export function Footer() {
  return (
    <footer id="footer" className="bg-black border-t border-white/10 py-16 px-6 md:px-12">
      <div className="max-w-400 mx-auto grid md:grid-cols-4 gap-12">
        <div>
          <h4 className="font-serif text-lg tracking-[0.2em] uppercase mb-6">Wistoan</h4>
          <p className="text-white/40 text-sm leading-relaxed">
            Crafting timeless masterpieces since 1895. A legacy of precision and elegance.
          </p>
        </div>

        <div>
          <h5 className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-6">Collection</h5>
          <ul className="space-y-3 text-sm text-white/40">
            <li>Royal Oak</li>
            <li>Nautilus</li>
            <li>Overseas</li>
            <li>Overseas Chronograph</li>
          </ul>
        </div>

        <div>
          <h5 className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-6">Atelier</h5>
          <ul className="space-y-3 text-sm text-white/40">
            <li>Bespoke Services</li>
            <li>Restoration</li>
            <li>Authentication</li>
          </ul>
        </div>

        <div>
          <h5 className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-6">Contact</h5>
          <ul className="space-y-3 text-sm text-white/40">
            <li>Geneva, Switzerland</li>
            <li>+41 22 123 4567</li>
            <li>concierge@wistoan.com</li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
        <p>&copy; 2024 Dixit Ambaliya. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
