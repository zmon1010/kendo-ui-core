using ApiChange.Api.Introspection;
using Mono.Cecil;
using NUnit.Framework;

namespace UnitTests.Introspection
{
    public class PublicApiDiffTests
    {
        private readonly TypeDefinition myEmptyClassDefinition;
        private readonly TypeDefinition myClassDefinitionWithMethod;

        public PublicApiDiffTests()
        {
            myEmptyClassDefinition = GetClass("specificClass");
            myClassDefinitionWithMethod = GetClass("specificClass");
            myClassDefinitionWithMethod.Methods.Add(new MethodDefinition("aPublicMethod", MethodAttributes.Public, myClassDefinitionWithMethod));
        
        }

        private static TypeDefinition GetClass(string typename)
        {
            return new TypeDefinition("any", typename, TypeAttributes.Class);
        }

        [Test]
        public void RealAssemblyWithRemovedTypesHasIncompatibleApi()
        {
            var assemblyDiffer = new AssemblyDiffer(TestConstants.BaseLibV1Assembly, TestConstants.BaseLibV2Assembly);
            var differ = new PublicApiDiff(assemblyDiffer);
            Assert.That(differ.ApiCompatibility, Is.EqualTo(Compatibility.Incompatible));
        }

        [Test]
        public void RealIdenticalAssembliesHaveIdenticalApi()
        {
            var assemblyDiffer = new AssemblyDiffer(TestConstants.BaseLibV1Assembly, TestConstants.BaseLibV1Assembly);
            var diffCollection = new PublicApiDiff(assemblyDiffer);
            Assert.That(diffCollection.ApiCompatibility, Is.EqualTo(Compatibility.Identical));
        }

        [Test]
        public void AssemblyWithAddedTypesHasBackwardsCompatibleApi()
        {
            var typeAdd = new DiffResult<TypeDefinition>(myEmptyClassDefinition, new DiffOperation(isAdded: true));
            var publicApiDiff = PublicAssemblyDiff.From(typeAdd);
            Assert.That(publicApiDiff.ApiCompatibility, Is.EqualTo(Compatibility.BackwardsCompatible));
        }

        [Test]
        public void AssemblyWithRemovedTypesHasIncompatibleApi()
        {
            var typeRemoval = new DiffResult<TypeDefinition>(myEmptyClassDefinition, new DiffOperation(isAdded: false));
            var publicDiff = PublicAssemblyDiff.From(typeRemoval);
            Assert.That(publicDiff.ApiCompatibility, Is.EqualTo(Compatibility.Incompatible));
        }

        [Test]
        public void AssemblyWithAddedMethodHasBackwardsCompatibleApi()
        {
            var typeChange = TypeDiff.GenerateDiff(myEmptyClassDefinition, myClassDefinitionWithMethod, QueryAggregator.PublicApiQueries);
            var diffCollection = PublicAssemblyDiff.From(typeChange: typeChange);
            Assert.That(diffCollection.ApiCompatibility, Is.EqualTo(Compatibility.BackwardsCompatible));
        }

    }
}