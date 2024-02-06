import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation, Prompt } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 , showprompt}) => {
  const location = useLocation();

  return (
    <>{showprompt ?
     ( <Prompt
        when={location.pathname === '/payment' && !location.pathname.endsWith('/placeorder')}
        message={(location) => {
          return 'You are in the payment step. Are you sure you want to leave?';
        }}
      />):null}

      <Nav className='justify-content-center mb-4'>
        <Nav.Item>
          {step1 ? (
            <LinkContainer to='/login'>
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Sign In</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step2 ? (
            <LinkContainer to='/shipping'>
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Register</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step3 ? (
            <LinkContainer to='/payment'>
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step4 ? (
            <LinkContainer to='/placeorder'>
              <Nav.Link>Proceed</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Proceed</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </>
  );
};

export default CheckoutSteps;
