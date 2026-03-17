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
          borderRadius: '3px',
          border: '1px solid var(--border-default)',
          padding: '2rem 2.25rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        {currentStep < 5 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: '400',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                textAlign: 'center',
              }}
            >
              FORA
            </div>
            <ProgressBar currentStep={currentStep} />
          </div>
        )}

        <div className="fade-in-up">
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
                    background: 'none',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-muted)',
                    borderRadius: '3px',
                    padding: '0.75rem 1.5rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '400',
                    fontSize: '0.875rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.borderColor = 'var(--border-hover)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.borderColor = 'var(--border-default)';
                      e.currentTarget.style.color = 'var(--text-muted)';
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
                  background: 'var(--accent)',
                  color: '#FAF8F4',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '0.75rem 2rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'background 0.15s',
                  marginLeft: currentStep === 1 ? 0 : 'auto',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = 'var(--accent-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = 'var(--accent)';
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
