/* eslint-disable react-hooks/rules-of-hooks */
import { fetchSessionStorageUser } from '../utils/user.session-storage';
import { defaultFetchOptions, HttpMethod } from '../constants/fetch.constant';
import { getAppUrl } from './common.helpers.ts';
import { cleanAppSessionStorage } from '../utils/session-storage';

export interface IUseFetchError extends Error {
  status: number;
  statusText: string;
}

class UseFetchError implements IUseFetchError {
  name: string;
  message: string;
  stack?: string;
  cause?: unknown;
  code: undefined;
  status: number;
  statusText: string;

  constructor(status: number, statusText: string, message: string) {
    this.name = 'UseFetchError';
    this.status = status;
    this.statusText = statusText;
    this.message = message;
    Object.setPrototypeOf(this, UseFetchError.prototype);
  }
}

export interface FetchResult<T> {
  data?: T;
  isLoading: boolean;
  error?: IUseFetchError | Error;
}

export interface HookOptionsWithFormatter<T> extends RequestInit {
  formatter?(response: Response): Promise<T>;
  skipToken?: boolean;
}

export const useFetch = async <T>(
  url: RequestInfo,
  options?: any | RequestInit | HookOptionsWithFormatter<T>,
): Promise<FetchResult<T> | T> => {
  try {
    options = {
      ...defaultFetchOptions,
      ...options,
    };

    const { token } = fetchSessionStorageUser();
    if (token && !options.skipToken && typeof url === 'string' && !url.includes('.json')) {
      options.headers.Authorization = `Bearer ${token}`;
    } else {
      delete options.headers.Authorization;
    }

    const response = await fetch(url, options);

    if ('formatter' in options) {
      return options.formatter(response);
    }

    const data = await response.json();

    if (!response.ok) {
      const status: number = data.statusCode || response.status;
      const statusText: string = data.errorCode || response.statusText;
      const message: string = data.message || 'Fetch error';
      throw new UseFetchError(status, statusText, message);
    }

    return {
      isLoading: false,
      data,
    };
  } catch (e: any) {
    if (e?.status === 401) {
      cleanAppSessionStorage();
      window.location.href = getAppUrl('start');
    }

    return {
      isLoading: false,
      error: e,
    };
  }
};

export const callApiGet = async <T>(
  url: RequestInfo,
  options?: RequestInit | HookOptionsWithFormatter<T>,
) => {
  options = {
    ...options,
    method: HttpMethod.GET,
  };

  return useFetch<T>(url, options);
};

export const callApiPost = async <T>(
  url: RequestInfo,
  options?: RequestInit | HookOptionsWithFormatter<T>,
) => {
  options = {
    ...options,
    method: HttpMethod.POST,
  };

  return useFetch<T>(url, options);
};

export const callApiPatch = async <T>(
  url: RequestInfo,
  options?: RequestInit | HookOptionsWithFormatter<T>,
) => {
  options = {
    ...options,
    method: HttpMethod.PATCH,
  };

  return useFetch<T>(url, options);
};

export const callApiPut = async <T>(
  url: RequestInfo,
  options?: RequestInit | HookOptionsWithFormatter<T>,
) => {
  options = {
    ...options,
    method: HttpMethod.PUT,
  };

  return useFetch<T>(url, options);
};

export const callApiDelete = async <T>(
  url: RequestInfo,
  options?: RequestInit | HookOptionsWithFormatter<T>,
) => {
  options = {
    ...options,
    method: HttpMethod.DELETE,
  };

  return useFetch<T>(url, options);
};
