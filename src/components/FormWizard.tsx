'use client';
import { useState } from 'react';
import { useFormState } from '@/hooks/useFormState';
import { submitEnquiry } from '@/lib/submitEnquiry';
import ProgressBar from './ProgressBar';
import StepDates from './StepDates';
import StepTravelers from './StepTravelers';
import StepBudget from './StepBudget';
import StepDetails from './StepDetails';
import StepConfirmation from './StepConfirmation';

interface FormWizardProps {
  itinerary: string;
}

export default function FormWizard({ itinerary }: FormWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state, dispatch, validate } = useFormState();

  const handleNext = async () => {
    setError(null);
    const validationError = validate(currentStep);

    if (validationError) {
      setError(validationError);
      return;
    }

    if (currentStep === 4) {
      // Submit the form
      setIsSubmitting(true);
      try {
        await submitEnquiry(state, itinerary);
        setCurrentStep(5);
      } catch (err) {
        setError('Failed to submit enquiry. Please try again.');
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepDates
            dates={state.travelDates}
            onChange={(payload) => dispatch({ type: 'SET_TRAVEL_DATES', payload })}
          />
        );
      case 2:
        return (
          <StepTravelers
            travelers={state.travelers}
            onChange={(payload) => dispatch({ type: 'SET_TRAVELERS', payload })}
          />
        );
      case 3:
        return (
          <StepBudget
            budget={state.budget}
            onChange={(payload) => dispatch({ type: 'SET_BUDGET', payload })}
          />
        );
      case 4:
        return (
          <StepDetails
            contact={state.contact}
            onChange={(payload) => dispatch({ type: 'SET_CONTACT', payload })}
            error={error || undefined}
          />
        );
      case 5:
        return <StepConfirmation />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        {currentStep < 5 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
            }}
          >
            <div style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0.05em' }}>
              FORA
            </div>
            <ProgressBar currentStep={currentStep} />
          </div>
        )}

        <div
          style={{
            opacity: 1,
            transition: 'opacity 0.3s',
          }}
        >
          {renderStep()}
        </div>

        {currentStep < 5 && (
          <>
            {error && currentStep !== 4 && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'var(--accent-bg)',
                  border: '1px solid var(--accent)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                }}
              >
                {error}
              </div>
            )}

            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                gap: '1rem',
                justifyContent: 'space-between',
              }}
            >
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  disabled={isSubmitting}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-default)',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'var(--hover-bg)';
                      e.currentTarget.style.borderColor = 'var(--hover-border)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'var(--border-default)';
                    }
                  }}
                >
                  BACK
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={isSubmitting}
                style={{
                  flex: currentStep === 1 ? 1 : 0,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: '1px solid var(--accent)',
                  background: 'var(--accent)',
                  color: 'var(--text-primary)',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  marginLeft: currentStep === 1 ? 0 : 'auto',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.opacity = '0.9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.opacity = '1';
                  }
                }}
              >
                {isSubmitting ? 'SUBMITTING...' : currentStep === 4 ? 'SUBMIT' : 'NEXT'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
