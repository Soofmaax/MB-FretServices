import { describe, it, expect } from 'vitest';
import { detectLangFromPath, keyFromPath, pathForLang, localizeTo } from '../paths';

describe('paths utils', () => {
  it('detectLangFromPath detects supported languages', () => {
    expect(detectLangFromPath('/fr/services')).toBe('fr');
    expect(detectLangFromPath('/en/contact')).toBe('en');
    expect(detectLangFromPath('/pt/servicos')).toBe('pt');
    expect(detectLangFromPath('/de/leistungen')).toBe('de');
    expect(detectLangFromPath('/unknown/path')).toBe('fr'); // fallback
  });

  it('keyFromPath maps aliases correctly', () => {
    expect(keyFromPath('/fr/services')).toBe('services');
    expect(keyFromPath('/en/legal-notice')).toBe('legal');
    expect(keyFromPath('/pt/servicos/frete-maritimo')).toBe('services_freight_maritime');
    expect(keyFromPath('/es/servicios/transporte-maritimo')).toBe('services_freight_maritime');
    expect(keyFromPath('/fr/')).toBe('home');
  });

  it('pathForLang builds localized paths', () => {
    expect(pathForLang('services', 'fr')).toBe('/fr/services');
    expect(pathForLang('contact', 'en')).toBe('/en/contact');
    expect(pathForLang('services_freight_maritime', 'pt')).toBe('/pt/servicos/frete-maritimo');
  });

  it('localizeTo transforms generic "to" into localized path', () => {
    expect(localizeTo('services', 'fr')).toBe('/fr/services');
    expect(localizeTo('services/fret-maritime', 'en')).toBe('/en/services/maritime-freight');
    expect(localizeTo('/contact', 'pt')).toBe('/pt/contacto');
  });
});