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
    const params = new URLSearchParams();

    if (options.populate) {
      if (typeof options.populate === 'string') {
        params.append('populate', options.populate);
      } else if (Array.isArray(options.populate)) {
        options.populate.forEach((item) => params.append('populate', item));
      } else {
        params.append('populate', JSON.stringify(options.populate));
      }
    }

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(`filters[${key}]`, JSON.stringify(value));
        }
      });
    }

    if (options.sort) {
      if (Array.isArray(options.sort)) {
        options.sort.forEach((item) => params.append('sort', item));
      } else {
        params.append('sort', options.sort);
      }
    }

    if (options.pagination) {
      if (options.pagination.page) {
        params.append('pagination[page]', options.pagination.page.toString());
      }
      if (options.pagination.pageSize) {
        params.append('pagination[pageSize]', options.pagination.pageSize.toString());
      }
    }

    if (options.publicationState) {
      params.append('publicationState', options.publicationState);
    }

    return params.toString();
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
