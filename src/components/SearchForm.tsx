import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Search, X } from 'lucide-react';
import { SearchFormValues } from '../types/exercise';

interface SearchFormProps {
  onSubmit: (values: SearchFormValues) => void;
  isLoading?: boolean;
  onClear?: () => void;
  currentQuery?: string;
}

const validationSchema = Yup.object({
  query: Yup.string()
    .min(3, 'Arama terimi en az 3 karakter olmalıdır')
    .max(50, 'Arama terimi en fazla 50 karakter olabilir')
    .required('Arama terimi gereklidir')
    .matches(/^[a-zA-ZşŞıİçÇöÖüÜğĞ\s]+$/, 'Sadece harfler kullanabilirsiniz'),
});

const SearchForm: React.FC<SearchFormProps> = ({ 
  onSubmit, 
  isLoading = false, 
  onClear,
  currentQuery = ''
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <Formik
        initialValues={{ query: currentQuery }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          // Form gönderildikten sonra temizle
          resetForm();
          // Input'a focus ol
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }}
        enableReinitialize={true}
      >
        {({ isSubmitting, errors, touched, values, setFieldValue }) => (
          <Form className="relative">
            <div className="relative">
              <Field
                innerRef={inputRef}
                type="text"
                name="query"
                placeholder="Egzersiz ara..."
                className={`w-full pl-10 sm:pl-12 pr-16 sm:pr-24 py-3 sm:py-4 text-base sm:text-lg border-2 rounded-xl sm:rounded-2xl transition-all duration-300 focus:outline-none focus:scale-105 shadow-lg ${
                  errors.query && touched.query
                    ? 'border-red-400 bg-red-50 focus:border-red-500'
                    : 'border-slate-200 bg-white focus:border-purple-500 focus:shadow-purple-200'
                }`}
                disabled={isLoading || isSubmitting}
                autoComplete="off"
              />
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
              
              {/* Clear button - sadece arama yapıldığında göster */}
              {currentQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setFieldValue('query', '');
                    onClear?.();
                    // Input'a focus ol
                    setTimeout(() => {
                      inputRef.current?.focus();
                    }, 100);
                  }}
                  className="absolute right-16 sm:right-24 top-1/2 transform -translate-y-1/2 p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  title="Aramayı temizle"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              <button
                type="submit"
                disabled={isLoading || isSubmitting || !values.query.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-400 disabled:to-slate-400 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg text-sm sm:text-base"
              >
                <span className="hidden sm:inline">{isLoading || isSubmitting ? 'Arıyor...' : 'Ara'}</span>
                <span className="sm:hidden">{isLoading || isSubmitting ? '...' : '🔍'}</span>
              </button>
            </div>
            <ErrorMessage
              name="query"
              component="div" 
              className="mt-2 text-red-500 text-xs sm:text-sm font-medium px-1"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;