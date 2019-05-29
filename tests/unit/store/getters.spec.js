import { expect } from 'chai';
import getters from '@/store/getters';
import mocks from './mocks';

describe('getters', () => {
  it('should get latLngPaths formatted when \'latLngPathsObject\' is called', () => {
    const state = {
      latLngPaths: mocks.latLngPaths,
    };
    const expectedLatLngPaths = mocks.latLngPaths.map(
      latLng => ({ lat: latLng[0], lng: latLng[1] }),
    );
    expect(getters.latLngPathsObject(state)).to.deep.equal(expectedLatLngPaths);
  });
});
