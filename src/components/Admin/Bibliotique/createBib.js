import React, { useState } from 'react';
import { BookOpen, MapPin, Building2 } from "lucide-react";

// Composants personnalisés avec Bootstrap
const Card = ({ children, className = '' }) => (
  <div className={`card border-0 shadow ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`card-header bg-white border-0 py-4 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`card-body pt-0 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`card-footer bg-white border-0 ${className}`}>
    {children}
  </div>
);

const Input = ({ icon: Icon, className, ...props }) => (
  <div className="position-relative">
    {Icon && (
      <div className="position-absolute top-50 translate-middle-y ms-3 text-muted">
        <Icon size={18} />
      </div>
    )}
    <input 
      className={`form-control form-control-lg ${Icon ? 'ps-5' : ''} ${className}`}
      {...props} 
    />
  </div>
);

const Label = ({ children, htmlFor, className = '' }) => (
  <label 
    htmlFor={htmlFor} 
    className={`form-label fw-medium ${className}`}
  >
    {children}
  </label>
);

const Button = ({ children, className = '', disabled, ...props }) => (
  <button 
    className={`btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2 ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

const Alert = ({ children }) => (
  <div 
    className="position-fixed bottom-0 end-0 m-3 fade show"
    style={{zIndex: 1050}}
  >
    <div className="alert alert-success d-flex align-items-center shadow-lg m-0">
      {children}
    </div>
  </div>
);

export default function CreateBib() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location) return;
    
    console.log('Submitted:', { name, location });
    setSubmitted(true);
    
    setTimeout(() => {
      setName('');
      setLocation('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <Card>
              <CardHeader>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-primary p-2 rounded-3">
                    <Building2 className="text-white" size={24} />
                  </div>
                  <h2 className="mb-0  ">
                    Créer une Bibliothèque
                  </h2>
                </div>
                <p className="text-muted mb-0">
                  Ajoutez une nouvelle bibliothèque à votre réseau de lecture.
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="mb-0">
                  <div className="mb-4">
                    <Label htmlFor="name">Nom de la bibliothèque</Label>
                    <Input
                      icon={BookOpen}
                      type="text"
                      id="name"
                      placeholder="ex: Bibliothèque Municipale"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="location">Emplacement</Label>
                    <Input
                      icon={MapPin}
                      type="text"
                      id="location"
                      placeholder="ex: 123 Rue de la Culture"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-100" 
                  onClick={handleSubmit}
                  disabled={!name || !location}
                >
                  <BookOpen size={20} />
                  <span>Créer la Bibliothèque</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {submitted && (
        <Alert>
          <div className="d-flex align-items-center gap-2">
            ✨ Bibliothèque créée avec succès !
          </div>
        </Alert>
      )}

      <style jsx global>{`
        .fade {
          transition: opacity 0.15s linear;
        }
        .fade.show {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}