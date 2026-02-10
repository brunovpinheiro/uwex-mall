import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

interface FetchOptions {
  populate?: string[] | string | object;
  filters?: object;
  sort?: string[] | string;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  publicationState?: 'live' | 'preview';
}

class StrapiClient {
  private baseURL: string;
  private token: string;

  constructor(baseURL: string, token: string) {
    this.baseURL = baseURL;
    this.token = token;
  }

  private buildQueryString(options: FetchOptions): string {
    // Usa qs.stringify para construir query strings compatíveis com Strapi v5
    return qs.stringify(options, {
      encodeValuesOnly: true, // Apenas valores são codificados
    });
  }

  async get(path: string, options: FetchOptions = {}) {
    const queryString = this.buildQueryString(options);
    const url = `${this.baseURL}${path}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Strapi request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async post(path: string, data: any) {
    const url = `${this.baseURL}${path}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Strapi request failed: ${response.statusText}`);
    }

    return response.json();
  }
}

export const strapi = new StrapiClient(STRAPI_URL, STRAPI_API_TOKEN);
